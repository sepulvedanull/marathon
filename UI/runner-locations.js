import * as d3 from 'd3';
import * as topojson from 'topojson';

let svg = d3.select('#runner-locations').append('svg');
let path = d3.geoPath();

svg.attrs({
    'width': 960,
    'height': 1000
})

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", "rgba(74,144,226,0.5)")
      .on('mouseover', function(d) {
          d3.select(this).style('fill', 'black');
      })
      .on('mouseout', function(d) {
          d3.select(this).style('fill', 'rgba(74,144,226,0.5)')
      })

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
});