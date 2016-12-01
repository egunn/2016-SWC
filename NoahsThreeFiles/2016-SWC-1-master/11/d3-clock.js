var data = [];

function updateData() {
  var time = {}
  var startTime = new Date();
  time.hour   = startTime.getHours();
  time.minute = startTime.getHours();
  time.second = startTime.getHours();
  time.millis = startTime.getHours();
  data[0] = time;
};

var bars   = d3.select('#bars');
var width  = parseInt(bars.attr('width'));
var height = parseInt(bars.attr('height'));
updateData();

bars.selectAll('.bar')
  .data(data)
  .enter()
  .append("rect")
  .attr('class', 'bar')
  .attr("width", 30)
  .attr("height", 100)



function biggen(datum,index) {
  var elem = d3.select(this);
  d3.select('.footnote').transition().style("opacity", "1");
  d3.select("#age").text(datum.age)
  d3.select("#weight").text(datum.weight)
  elem.classed("selected", true)
  elem.transition()
    .duration(250)
    .delay(0)
    .ease(d3.easeElastic)
    .attr("r", 20);
}


function smallen(datum,index) {
  var elem = d3.select(this);
  d3.select('.footnote').transition().duration(1000).style("opacity", "0");
  elem.classed("selected", false)
  elem.transition()
    .duration(1000)
    .delay(10)
    .attr("r", 10);
}

function weightToY (data) {
  return weightScale(data.weight);
};

function ageToX (data) {
  return ageScale(data.age);
};

