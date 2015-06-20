var React = require('react'),
    Map = require('./map/MapController.react'),
    Drawer = require('./drawer/Drawer.react'),
    Menu = require('./menu/Menu.react.js'),
    hereApi = require('../apis/here'),
    route360Api = require('../apis/route360'),
    _ = require('lodash'),
    Q = require('q'),
    ClusterActions = require('app/actions/ClusterActions'),
    ClustersStore = require('app/stores/ClustersStore');


var _state = {
  clusters: [],
  travelTime: 2,
  travelMode: 'car',
  weekday: 0,
  map: [52.522644823574645, 13.40628147125244, 14]
}

var config = {
  stateParseFunctions: {
    'clusters': function(clusters) {
      if(!clusters) return undefined;
      return _(clusters.split(',')).groupBy(function(coordinate, i){
          return Math.floor(i/2);
        })
        .map(function(val, key) {
          return val;
        })
        .value();
    },
    'map': function(mapParams) {
      if(!mapParams) return undefined;
      return mapParams.split(',');
    }
  },
  stateComposeFunctions: {
    'clusters': function(clusters) {
      if(!clusters) return undefined;
      return clusters.join(',');
    },
    'map': function(mapParams) {
      if(!mapParams) return undefined;
      return mapParams.join(',');
    }
  }
}


function getClusters(config) {
  return ClustersStore.get(config);
};



var Component = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      drawerIsOpen: false,
      clusters: [],
      travelTime: 2,
      weekday: 0,
      travelMode: 'car',
      mapBounds: undefined
    }
  },

  componentDidMount: function() {
    var that = this;
    ClustersStore.addChangeListener(function() {
      that.forceUpdate();
    });
  },

  shouldComponentUpdate: function(nexProps, nextState) {
    
    return (true
        // don't update if mapBounds changed
        //this.props !== nextProps.mapBounds
      )
  },


  /**
  * Creates the state of the application by parsing the URL.
  * ?clusters=lat1,lng1,lat2,lng2&travelTime=20&travelMode=car&weekday=0&map=52,13,14
  */
  parseUrlState: function() {
    var routes = this.context.router.getCurrentRoutes(),
        params = this.context.router.getCurrentParams(),
        query = this.context.router.getCurrentQuery(),
        last = routes[routes.length - 1];

    return _(_state)
      // parse individual query parameters according to their parse function
      .map(function(defaultValue, key) {
        var param,
            parseFunction = config.stateParseFunctions[key],
            hyphenatedKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
            value = query[hyphenatedKey];


        if(!value)
          param = defaultValue;
        else if(parseFunction)
          param = parseFunction(value);
        else
          param = /^\d+$/.test(value) ? parseFloat(value) : value;

        return [key, param];
      })
      .object()
      .value();
  },

  /**
  * Creates a query string from state
  */
  composeUrlState: function(state) {
    return _(state)
      .map(function(value, key) {
        var hyphenatedKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
            composeFunction = config.stateComposeFunctions[key] || function(param){return param + ''};

        return [hyphenatedKey, composeFunction(value)];
      })
      .object()
      .value();
  },


  /**
  * MAP INTERACTION
  */

  handleMapClick: function(e) {
    var that = this;
    var state = this.parseUrlState();
    this._handleTransition(state);

    ClusterActions.add({
      travelMode: that.state.travelMode,
      weekday: that.state.weekday,
      travelTime: that.state.travelTime,
      startLocation: [e.latlng.lat, e.latlng.lng]
    });
  },

  handleMapBoundsChanged: function(mapBounds) {
    
  },


  /**
  * GENERAL INTERACTION
  */

  _transitionTo: function(newState) {
    var nextState = _.merge({}, _state, newState),
        routes = this.context.router.getCurrentRoutes(),
        params = this.context.router.getCurrentParams(),
        query = this.composeUrlState(nextState);

    this.context.router.transitionTo(routes[routes.length - 1].path, params, query);
  },

  handleDrawerToggle: function() {
    this.setState({drawerIsOpen: !this.state.drawerIsOpen});
  },

  handleIsolinesSettingsChange: function(newState) {
    var nextState = _.assign({}, this.state, _settings);
    this.setState(nextState);

    ClusterActions.update({
      travelMode: nextState.travelMode,
      weekday: nextState.weekday,
      travelTime: nextState.travelTime
    });
  },

  render: function() {
    var clusters;

    // merge last state with new state parsed from URL
    _.merge(_state, this.parseUrlState());
    // get current clusters...
    clusters = getClusters(_.omit(_state, ['clusters', 'map']));
    // ...and update clusters so new ones will be loaded
    ClusterActions.update(_.omit(_state, ['map']));

    return (
        <div className="controller-view">
          <Map
            state={_state}
            clusters={clusters}
            handleStateChange={this._transitionTo}
            handleMapBoundsChanged={this.handleMapBoundsChanged} />
          <Menu 
            state={_state}
            handleDrawerToggle={this.handleDrawerToggle}
            handleTransition={this._transitionTo}
            isOpen={this.state.drawerIsOpen} />
          <Drawer
            travelTime={this.state.travelTime}
            isOpen={this.state.drawerIsOpen} 
            clusters={clusters}/>
        </div>
      )
  }
});

module.exports = Component;