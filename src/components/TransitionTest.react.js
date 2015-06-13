var React = require('react'),
    d3 = require('d3');

var Info = React.createClass({
  componentDidMount: function() {
    var svg = d3.select(this.refs.svg.getDOMNode());

    var d0 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100",
        d1 = "M0,0c100,0 0,100 100,100c100,0 0,-100 100,-100c100,0 0,100 100,100";

    var d0 = "M120.33333333333333,409.5C124.33333333333333,394.66666666666663,129.66666666666666,376.3333333333333,133.66666666666666,367C137.66666666666666,357.66666666666663,140.33333333333331,357.3333333333333,145.66666666666666,357.83333333333337C151,358.3333333333333,159,359.66666666666663,166.66666666666666,353.3333333333333C174.33333333333331,347,181.66666666666666,333,185.16666666666669,309.5C188.66666666666666,286,188.33333333333331,253,196.83333333333331,231.83333333333331C205.33333333333331,210.66666666666666,222.66666666666666,201.33333333333331,242.5,202.33333333333331C262.3333333333333,203.33333333333331,284.66666666666663,214.66666666666666,298.3333333333333,220.83333333333331C312,227,317,228,323.3333333333333,207.33333333333331C329.66666666666663,186.66666666666666,337.3333333333333,144.33333333333331,333.5,111.66666666666666C329.66666666666663,79,314.3333333333333,56,307.16666666666663,44.666666666666664C300,33.33333333333333,301,33.666666666666664,302.3333333333333,34.166666666666664C303.66666666666663,34.666666666666664,305.3333333333333,35.33333333333333,306.8333333333333,36C308.3333333333333,36.666666666666664,309.66666666666663,37.33333333333333,312.3333333333333,38.33333333333333C315,39.33333333333333,319,40.666666666666664,321.49999999999994,41.66666666666667C324,42.666666666666664,325,43.33333333333333,327.66666666666663,44.49999999999999C330.3333333333333,45.666666666666664,334.66666666666663,47.33333333333333,347.3333333333333,37.833333333333336C360,28.333333333333332,381,7.666666666666666,399.3333333333333,7.333333333333333C417.66666666666663,7,433.3333333333333,27,447.3333333333333,23.333333333333332C461.3333333333333,19.666666666666664,473.66666666666663,-7.666666666666666,482.16666666666663,-23C490.66666666666663,-38.33333333333333,495.3333333333333,-41.666666666666664,509.66666666666663,-45.333333333333336C524,-49,548,-53,563.3333333333333,-61.33333333333333C578.6666666666666,-69.66666666666666,585.3333333333333,-82.33333333333333,600.3333333333333,-78.83333333333333C615.3333333333333,-75.33333333333333,638.6666666666666,-55.666666666666664,651.1666666666666,-45.83333333333333C663.6666666666666,-36,665.3333333333333,-36,670.3333333333334,-35.5C675.3333333333333,-35,683.6666666666666,-34,697.3333333333334,-22.666666666666668C711,-11.333333333333334,730,10.333333333333332,749.5,18.333333333333332C769,26.333333333333332,788.9999999999999,20.666666666666664,802,18.166666666666664C814.9999999999999,15.666666666666666,820.9999999999999,16.333333333333332,824.3333333333331,18.5C827.6666666666665,20.666666666666664,828.3333333333333,24.33333333333333,828.6666666666666,30.499999999999996C829,36.666666666666664,829,45.33333333333333,835.6666666666665,66C842.3333333333333,86.66666666666666,855.6666666666665,119.33333333333333,865.8333333333333,136C875.9999999999999,152.66666666666666,882.9999999999999,153.33333333333331,892.1666666666665,157C901.3333333333333,160.66666666666666,912.6666666666666,167.33333333333331,916.3333333333333,191.5C920,215.66666666666666,916,257.3333333333333,908.5,289C901,320.66666666666663,890,342.3333333333333,891,366C892,389.66666666666663,905,415.3333333333333,901.5,442.1666666666667C898,469,878,497,864.5,529C851,561,844,597,848.6666666666666,625.5C853.3333333333333,654,869.6666666666666,675,870.8333333333333,693.8333333333334C872,712.6666666666666,858,729.3333333333333,842.3333333333333,741.6666666666665C826.6666666666666,754,809.3333333333333,761.9999999999999,788.8333333333333,776.3333333333333C768.3333333333333,790.6666666666665,744.6666666666666,811.3333333333333,723.8333333333333,821.1666666666666C703,831,685,830,663.8333333333333,823.4999999999999C642.6666666666666,817,618.3333333333333,805,600.1666666666666,801.6666666666665C582,798.3333333333333,570,803.6666666666665,561,808.1666666666665C552,812.6666666666665,546,816.3333333333333,533.5,808.8333333333334C521,801.3333333333333,502,782.6666666666666,483.66666666666663,762.6666666666666C465.3333333333333,742.6666666666666,447.66666666666663,721.3333333333333,433.66666666666663,714.1666666666666C419.66666666666663,707,409.3333333333333,714,399.16666666666663,701.8333333333333C389,689.6666666666666,379,658.3333333333333,366,632C353,605.6666666666666,337,584.3333333333333,318.6666666666667,566.1666666666666C300.3333333333333,548,279.66666666666663,533,267.16666666666663,522.1666666666666C254.66666666666666,511.3333333333333,250.33333333333331,504.66666666666663,244.16666666666666,495.66666666666663C238,486.66666666666663,230,475.3333333333333,224.16666666666666,467.16666666666663C218.33333333333331,459,214.66666666666666,454,212.33333333333331,450.66666666666663C210,447.3333333333333,209,445.66666666666663,208.49999999999997,444.66666666666663C208,443.66666666666663,208,443.3333333333333,207.83333333333331,442.66666666666663C207.66666666666666,442,207.33333333333331,441,206.83333333333331,438.33333333333326C206.33333333333331,435.66666666666663,205.66666666666666,431.33333333333326,193.66666666666666,421.33333333333326C181.66666666666666,411.33333333333326,158.33333333333331,395.66666666666663,143.33333333333331,404C128.33333333333331,412.3333333333333,121.66666666666666,444.66666666666663,117.99999999999999,459.66666666666663C114.33333333333331,474.66666666666663,113.66666666666666,472.3333333333333,113.33333333333333,470.5C113,468.66666666666663,113,467.33333333333326,112.66666666666666,464.83333333333326C112.33333333333333,462.33333333333326,111.66666666666666,458.66666666666663,111.33333333333333,456C111,453.3333333333333,111,451.66666666666663,111,450.3333333333333C111,449,111,448,112.33333333333333,441.8333333333333C113.66666666666666,435.66666666666663,116.33333333333333,424.3333333333333,120.33333333333333,409.5";
    var d1 = "M803.1666666666666,207C809.6666666666666,181,814.3333333333333,170,825.5,155.33333333333334C836.6666666666666,140.66666666666666,854.3333333333333,122.33333333333333,872.3333333333333,106.33333333333333C890.3333333333333,90.33333333333333,908.6666666666666,76.66666666666666,925.3333333333333,57.83333333333333C942,39,957,15,973.3333333333333,12C989.6666666666666,9,1007.3333333333333,27,1029.8333333333333,41.33333333333333C1052.3333333333333,55.666666666666664,1079.6666666666665,66.33333333333333,1100.3333333333333,72.33333333333333C1121,78.33333333333333,1135,79.66666666666666,1153.3333333333333,75.66666666666666C1171.6666666666665,71.66666666666666,1194.3333333333333,62.33333333333333,1216.6666666666665,70.16666666666666C1239,78,1261,103,1277.8333333333333,112.99999999999999C1294.6666666666665,123,1306.3333333333333,118,1317.8333333333333,113.49999999999999C1329.3333333333333,109,1340.6666666666665,105,1355,100.16666666666666C1369.3333333333333,95.33333333333333,1386.6666666666665,89.66666666666666,1404.3333333333333,105.16666666666666C1422,120.66666666666666,1440,157.33333333333331,1452.6666666666667,182.99999999999997C1465.3333333333333,208.66666666666663,1472.6666666666665,223.33333333333331,1487.333333333333,245.16666666666666C1502,267,1523.9999999999998,296,1538.5,309C1552.9999999999998,322,1559.9999999999998,319,1571.1666666666663,311.8333333333333C1582.333333333333,304.66666666666663,1597.6666666666665,293.3333333333333,1608,286C1618.3333333333333,278.66666666666663,1623.6666666666665,275.3333333333333,1628.6666666666665,276.66666666666663C1633.6666666666665,278,1638.3333333333333,284,1633.5,299.8333333333333C1628.6666666666665,315.66666666666663,1614.333333333333,341.3333333333333,1596.4999999999998,365.8333333333333C1578.6666666666665,390.3333333333333,1557.3333333333333,413.66666666666663,1540.4999999999998,432.66666666666663C1523.6666666666665,451.66666666666663,1511.3333333333333,466.33333333333326,1510.6666666666665,491.16666666666663C1510,516,1521,551,1521.3333333333333,575.1666666666666C1521.6666666666665,599.3333333333333,1511.3333333333333,612.6666666666666,1495.8333333333333,615.8333333333334C1480.3333333333333,619,1459.6666666666665,612,1442.5,610C1425.3333333333333,608,1411.6666666666665,611,1391.3333333333333,611.5C1371,612,1344,610,1328.3333333333333,626.6666666666666C1312.6666666666665,643.3333333333333,1308.3333333333333,678.6666666666666,1299.8333333333333,694C1291.3333333333333,709.3333333333333,1278.6666666666665,704.6666666666666,1260,704.8333333333333C1241.3333333333333,705,1216.6666666666665,710,1197.3333333333333,708.9999999999999C1178,708,1164,701,1146.1666666666665,699.3333333333333C1128.3333333333333,697.6666666666666,1106.6666666666665,701.3333333333333,1086,699C1065.3333333333333,696.6666666666666,1045.6666666666665,688.3333333333333,1029.8333333333333,685.1666666666666C1014,682,1002,684,986.1666666666666,675.5C970.3333333333333,667,950.6666666666666,648,930.8333333333333,639.6666666666666C911,631.3333333333333,891,633.6666666666666,870.3333333333333,626.5C849.6666666666666,619.3333333333333,828.3333333333333,602.6666666666666,813.3333333333333,592.8333333333333C798.3333333333333,583,789.6666666666666,580,787.1666666666666,567.8333333333333C784.6666666666666,555.6666666666666,788.3333333333333,534.3333333333333,783.5,507.16666666666663C778.6666666666666,480,765.3333333333333,447,763.3333333333333,414C761.3333333333333,381,770.6666666666666,348,779.5,311C788.3333333333333,274,796.6666666666666,233,803.1666666666666,207";

    svg.append("path")
        .attr("transform", "translate(0,50)scale(.5,.5)")
        .attr("d", d0)
        .call(transition, d0, d1);

    function transition(path, d0, d1) {
      path.transition()
          .duration(2000)
          .attrTween("d", pathTween(d1, 6))
          .each("end", function() { d3.select(this).call(transition, d1, d0); });
    }

    function pathTween(d1, precision) {
      return function() {
        var path0 = this,
            path1 = path0.cloneNode(),
            n0 = path0.getTotalLength(),
            n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

        // Uniform sampling of distance based on specified precision.
        var distances = [0], 
            i = 0, 
            dt = precision / Math.max(n0, n1);

        while ((i += dt) < 1) distances.push(i);
        distances.push(1);

        // Compute point-interpolators at each distance.
        var points = distances.map(function(t) {
          var p0 = path0.getPointAtLength(t * n0),
              p1 = path1.getPointAtLength(t * n1);
          return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
        console.log(points);

        return function(t) {
          return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
        };
      };
    }
  },
  render: function() {
    return (
      <div>
        <svg ref="svg" width="960" height="500">
        </svg>
      </div>
    )
  }
});

module.exports = Info;