var myWeights = [
  {age: 1, weight: 10},
  {age: 4, weight: 30},
  {age: 6, weight: 50},
  {age: 8, weight: 60},
  {age: 10, weight: 70},
  {age: 13, weight: 80},
  {age: 16, weight: 120},
  {age: 18, weight: 120},
  {age: 20, weight: 125},
  {age: 25, weight: 125},
  {age: 29, weight: 130},
  {age: 30, weight: 150},
  {age: 35, weight: 160},
  {age: 38, weight: 170},
  {age: 40, weight: 140},
  {age: 42, weight: 150},
  {age: 43, weight: 160},
  {age: 45, weight: 150}
];

var height = 500;
var width = 500;
var margin = {left: 60, bottom: 60, right: 10, top: 10};

var weightScale     = d3.scaleLinear().domain([0,200]).range([height - margin.bottom, margin.top]);
var ageScale        = d3.scaleLinear().domain([0,60]).range([margin.left, width - margin.right]);


function weightToY (data) {
 return weightScale(data.weight);
};

function ageToX (data) {
  return ageScale(data.age);
};

var svg = d3.select('svg');
var axisBottom =d3.axisBottom(ageScale);
var axisLeft =d3.axisLeft(weightScale);

svg.selectAll('circle')
  .data(myWeights)
  .enter()
  .append("circle")
  .attr('class', 'weight')
  .attr("cx", ageToX)
  .attr("cy", weightToY)
  .attr("fill", "hsl(0,40%,60%)")
  .attr("r", '5');

svg.append('g')
  .attr("transform", "translate(0," + (height - margin.bottom) + ")")
  .call(axisBottom);

svg.append('g')
  .attr("transform", "translate(" + margin.left + ",0)")
  .call(axisLeft);

// text label for the y axis
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", margin.left/3)
  .attr("x", 0 - (height / 2))
  .style("text-anchor", "middle")
  .text("weight");

// text label for the x axis
svg.append("text")
  .attr("y", height - margin.bottom/3)
  .attr("x", width / 2)
  .style("text-anchor", "middle")
  .text("age");
