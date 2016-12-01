var width  = 500;
var height = 500;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

var projection;


// Setup our project to fit all the complete map into our SVG region:
function fitMapToSVGBounds(geoData) {
  projection = d3.geoMercator().scale(1).translate([0,0]);
  var path = d3.geoPath().projection(projection);
  var bounds = path.bounds(geoData);
  var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
      (bounds[1][1] - bounds[0][1]) / height);
  var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
    (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
  projection.scale(scale).translate(transl);
};

// Draw our base map, which can be something made here: http://mapstarter.com/
function drawBaseMap(geoData) {
  var path = d3.geoPath().projection(projection);
  svg.selectAll(".land")
    .data(geoData.features)
    .enter().append('path')
    .attr('class','land')
    .style("fill", "hsl(0,10%,30%")
    .attr("d", path);
}

// Load a custom point data layer created with http://geojson.io/
function loadAndDrawPointLayer(geoJasonFile){
  d3.json(geoJasonFile, function(data) {
    svg.selectAll(".places")
      .data(data.features)
      .enter().append('circle')
      .attr('class','places')
      .style("fill", "white")
      .attr("r", 4)
      .attr("cx", function(data) {
        return projection(data.geometry.coordinates)[0];
      })
      .attr("cy", function(data) {
        return projection(data.geometry.coordinates)[1];
      } );
  });
};

d3.json("simple-ma.json", function(geoData) {
  // 1: setup map projection:
  fitMapToSVGBounds(geoData);
  // 2: draw the base map (usually outlines):
  drawBaseMap(geoData);
  // 3: draw point data:
  loadAndDrawPointLayer('./noahs-geo.json');
});


