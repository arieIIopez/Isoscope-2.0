var ClusterConstants = require('../constants/ClusterConstants'),
    EventEmitter = require('events').EventEmitter,
    hereApi = require('../apis/here'),
    api = require('app/apis'),
    reverseGeoCodeApi = require('app/apis/reverseGeoCode'),
    Q = require('q'),
    L,
    md5 = require('blueimp-md5'),
    dispatcher = require('../dispatcher'),
    d3 = require('d3'),
    _ = require('lodash');

if(process.env.BROWSER) {
  L = require('leaflet');
}

var CHANGE_EVENT = 'change';


/**
* Holds all the clusters as geoJSONs with structure:
* {
*   "type": "FeatureCollection",
*   "properties": {
*     "startLocation": [ 52.526456973352445, 13.363151550292969 ],
*     "hoursOfDay": [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
*     "meanDistance": 871.6379946706592,
*     "maxDistance": 1548.1109234458077,
*     "minDistance": 154.92081258254476
*   },
*   "features": [
*     {
*       "geometry": {
*         "type": "Polygon",
*         "coordinates": [[[lat,lng], [lat,lng]]]
*       },
*       "properties": {
*         "travelMode": "undefined",
*         "travelTime": "undefined",
*         "departureTime": "0",
*         "weekday": "undefined",
*         "startLocation": [
*           "52.526456973352445",
*           "13.363151550292969"
*         ],
*         "distances": [ 1548.1109234458077, 1357.3765392551702, 1346.5382251156732, 1205.1121571827152,...],
*         "meanDistance": 977.1755604650635,
*         "maxDistance": 1548.1109234458077,
*         "minDistance": 237.6430430714227,
*         "medianDistance": 1028.8241689562765
*       }
*     }
*   ]
* }
*/

var _clusters = {},
    _locationInfos = [],
    isLoading = false;


/*
* Updates _clusters with the specified options.
*  1. Get promises for all clusters whether cached or not
*  2. Store all new clusters with generated hash as key
  {
    clusters: [[]],
    travelTime: 5,
    travelDay: 0,
    departureTime: 6,
    travelModes: ['car', 'bike']
  }

*/


var update = _.throttle(function(options) {
  var clusterPromise = updateClusters(options);
  var locationInfoPromise = updateLocationInfo(options.clusters);

  return Q.all([clusterPromise, locationInfoPromise])
    .spread(function(newClusters, locationInfo) {
      addLocationInfo(newClusters);
    });
}, 100);


function addLocationInfo(clusters) {
  _.forEach(clusters, function(cluster) {
    var clusterLocation = cluster.properties.startLocation.toString(),
        locationInfo = _locationInfos[clusterLocation];

      cluster.properties.location = locationInfo;
  });
}


function updateLocationInfo(clusters) {
  var infoConfigs = _(clusters)
    .filter(function(cluster) {
      return !_locationInfos[cluster.toString()]
    })
    .map(function(cluster) {
      return reverseGeoCodeApi.get(cluster);
    })
    .value();

  return Q.all(infoConfigs)
    .spread(function() {
      var locationInfos = Array.prototype.slice.call(arguments);
        _.forEach(infoConfigs, function(locationInfo) {
          _locationInfos[locationInfo.latlng.toString()] = locationInfo;
        });

      return infoConfigs;
    });
}


function updateClusters(options) {
  var clusterConfigs = _(options.clusters) // create individual cluster config for every mode and startLocation in options
        .map(function(cluster) {
          return _(options.travelModes)
            .map(function(mode) {
              return {
                startLocation: cluster,
                travelMode: mode,
                weekday: options.weekday,
                travelTime: options.travelTime
              };
            })
            .value();
        })
        .flatten()
        .value();

  isLoading = true;

  return Q.all(loadClusters(clusterConfigs))
    .spread(function() {
      // find the newly fetched clusters
      var newClusters = _.chain(Array.prototype.slice.call(arguments))
        .filter(_.negate(_.isUndefined))
        .forEach(calculateProperties)
        .value();

      // save newly fetched clusters to _clusters
      _(newClusters).map(function(cluster) {
        var clusterConfig = {
          startLocation: cluster.properties.startLocation,
          travelMode: cluster.properties.travelMode,
          weekday: options.weekday,
          travelTime: options.travelTime
        },
        hash = md5(JSON.stringify(clusterConfig));

        _clusters[hash] = cluster;
      })
      .value();

      return newClusters;
    });
}

/**
* Returns a promise for all the clusters with the same startLocation. For each location checks if a cluster with specified options
* exists in cache. If not fetches a new one.
*/

function loadClusters(clusterConfigs) {
  return _(clusterConfigs)
    .map(function(clusterConfig) {
      var hash = md5(JSON.stringify(clusterConfig)),
          deferred = Q.defer(),
          cluster = _clusters[hash];

      if(!cluster) {
        return api.get(clusterConfig);
        //return hereApi.getClusters(clusterConfig);
      }

      deferred.resolve(undefined);
      return deferred.promise;
    }).value();
}


/**
* Calculates distance properties for cluster passed as argument.
* Calculates following properties on cluster and isolines
* {array}   cluster.features[n].properties.distances                                  An array of all the distances for all the individual points on the isoline
* {number}  cluster.features[n].properties.[meanDistance, maxDistance, minDistance]   The mean of all the distances of all the points on the isoline
* {number}  cluster.properties.[meanDistance, maxDistance, minDistance]               The mean of all the means of all the points on the isoline
*/
function calculateProperties(cluster) {
  calculateDistances(cluster);

  reduceDistancesOfIsolines(cluster, d3.mean, 'meanDistance');
  reduceDistancesOfIsolines(cluster, d3.max, 'maxDistance');
  reduceDistancesOfIsolines(cluster, d3.min, 'minDistance');
  reduceDistancesOfIsolines(cluster, d3.median, 'medianDistance');

  reduceDistancesOfClusters(cluster, d3.mean, 'meanDistance');
  reduceDistancesOfClusters(cluster, d3.max, 'maxDistance');
  reduceDistancesOfClusters(cluster, d3.min, 'minDistance');
  return cluster;
}


/*

  coordinates: [ // shape
    [ // partial shape
      [ [x1,y1], [x2,y2] ], // outer
      [ [x3,y3], [x4,y4] ]  // innter
    ]
  ]

*/

function calculateDistances(cluster) {
  var startLocation = cluster.properties.startLocation;
  cluster.features.forEach(function(isoline) {
    var points = _(isoline.geometry.coordinates).flatten().flatten().value();
    isoline.properties.distances = getDistances(startLocation, points);
  });
}

function getDistances(startLocation, points) {
  var startLatLng = L.latLng([startLocation[0], startLocation[1]]);
  return points.map(function(point) {
    var latLng = L.latLng([point[0], point[1]]);
    return startLatLng.distanceTo(latLng);
  });
}


/**
* Calculates the reduced distance function of the isoline. Executes the reduceFunc function
* on the distance array of every isoline.
*/
function reduceDistancesOfIsolines(cluster, reduceFunc, propertyName) {
  cluster.features.forEach(function(isoline) {
    isoline.properties[propertyName] = reduceFunc(isoline.properties.distances);
  });
}


/**
* Runs the reduceFunc over all the distances of all the isolines cluster
*/
function reduceDistancesOfClusters(cluster, reduceFunc, propertyName) {
  cluster.properties[propertyName] = reduceFunc(cluster.features, function(isoline) {
    return reduceFunc(isoline.properties.distances);
  });
}


function remove(startLocation) {
  if(!startLocation) {
    _clusters = [];
    return;
  }
  
  _clusters = _(_clusters)
    .pairs()
    .filter(function(pair) {
      var cluster = pair[1];
      return !(cluster.properties.startLocation[0] === startLocation[0]) && !(cluster.properties.startLocation[1] === startLocation[1]);
    })
    .object()
    .value();
}


var ClustersStore = _.assign({}, EventEmitter.prototype, {

  get: function(config) {
    var clusters =  _(config.travelModes)
      // for every travelMode get the clusters with the right configuration
      .map(function(travelMode) {
        return _(config.clusters)
          .map(function(startLocation){
            
            var clusterConfig = {
              startLocation: startLocation,
              travelMode: travelMode,
              weekday: config.weekday,
              travelTime: config.travelTime
            },
            hash = md5(JSON.stringify(clusterConfig));

            return _clusters[hash];
          })
          .value();
      })
      .flatten()
      // group clusters by start location
      .groupBy(function(cluster) {
        return cluster.properties.startLocation.toString();
      })
      .map(_.identity)
      .value();

    return clusters;
  },

  getAll: function() {
    return _clusters;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoading: function() {
    return isLoading;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case ClusterConstants.CLUSTER_UPDATE:
        isLoading = true;
        update(action.data)
          .then(function(newClusters) {
            isLoading = false;
            ClustersStore.emitChange();
          }, function(err) {
            console.log(err);
          });
        break;
      case ClusterConstants.CLUSTER_REMOVE:
        remove(action.data);
        break;
      default:
        break;
    }

    return true;
  })
});

module.exports = ClustersStore;