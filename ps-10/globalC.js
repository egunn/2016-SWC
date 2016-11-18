//setup page and global variables
//set some margins and record width and height of window
margin = {t: 25, r: 0, b: 25, l: 50};

width = document.getElementById('cBarChart').clientWidth - margin.r - margin.l;
height = 400; //document.getElementById('cBarChart').clientHeight - margin.t - margin.b;

console.log(width, height);

carbonPlot = d3.select("#cBarChart")
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('background','transparent');

data = [
    {id:"living",class:"Living",value:650},
    {id:"atmosphere",class:"Atmosphere",value:780},
    {id:"soil",class:"Soil",value:2730},
    {id:"oil",class:"Coal, Oil, Gas",value:4130},
    {id:"oceans", class:"Oceans",value:38153}
];

pieData = [
    {id:"SOC",slice:"soil organic carbon",value:1550},
    {id:"Carbonate",slice:"carbonate minerals in the soil",value:950},
    {id:"leaf",slice:"leaf litter",value:80},
    {id:"peat",slice:"peat",value:150}
];

var chartLoc = {xwidth:width-30,xheight:5*height/6,ytop:margin.t};



var x = d3.scaleBand().rangeRound([0, ((chartLoc.xwidth))]).padding(.5).domain(data.map(function (d) {
    return d.class;
}));
var y = d3.scaleLinear().rangeRound([chartLoc.ytop, chartLoc.xheight]).domain([d3.max(data, function (d) {
    return d.value;
}),0]);


//group to plot bars in
barGroup = carbonPlot.append('g')
    .attr('class','bar-group')
    .attr('transform','translate('+ margin.l + ',40)');

pieChart = carbonPlot.append('g')
    .attr('class','pie-group')
    .attr('transform','translate(' + (x('Soil')+ 80) + ',' + height/2 + ')');

var narrative = carbonPlot
    .append('text')
    .attr('x',width/2)
    .attr('y',100)
    .attr('fill','lightgray')
    .attr('fill-opacity',1)
    .attr('font-size', '75px')
    .style('text-anchor','middle')
    .text('Carbon');

narrative
    //carbon appear, and then fade
    .transition()
    .duration(2000)
    .attr('fill-opacity',0)

    //change the font size
    .transition()
    .duration(0)
    .delay(0)
    .attr('font-size', '24px')

    //write the new text
    .transition()
    .delay(500)
    .text('It\'s a huge player in climate change.')

    //set the opacity back to 1, to fade in
    .duration(2000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('Most of the world\'s carbon is stored in the oceans.')

    .transition()
    .attr('font-size', '24px')
    //fade back in
    .duration(2000)
    .attr('fill-opacity',1)

    .transition()
    .delay(1000)
    .on("end",function(){
        drawBars();
        easeBar('oceans');
    })


    //fade out the text again
    .transition()
    .duration(2000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('By comparison, a lot less is in the atmosphere')
    .on("end",function(){
        easeBar('atmosphere');
    })

    //fade back in
    .duration(2000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(2000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('Coal, oil, and gas reserves contain about 5x as much carbon')
    .on("end",function(){
        easeBar('oil');
    })

    //fade back in
    .duration(2000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(2000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('And all life on earth uses just a fraction of that amount')
    .on("end",function(){
        easeBar('living');
    })

    //fade back in
    .duration(2000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(2000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('After fossil fuels, soil stores the most carbon on earth')
    .on("end",function(){
        easeBar('soil');
    })

    //fade back in
    .duration(2000)
    .attr('fill-opacity',1);




function drawBars(){

//add axes and titles
var xAxis = barGroup.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + chartLoc.xheight + ")")
    .call(d3.axisBottom(x));

xAxis
    .selectAll("text")
    .attr("dy", ".8em")
    .attr('font-size','12px')
    .attr('fill','gray')
    .style("text-anchor", "middle");

var yAxis = barGroup.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y)
        .ticks(5));
//.tickFormat(d3.formatPrefix(",.0", 1e6)));

yAxis.selectAll('text')
    .attr('fill',"gray");

/*
barGroup.append('text')
    .attr('x', width/2-15)
    .attr('y', -10)
    .style('font-size', 14)
    .attr('fill',"gray")
    .style('text-anchor', 'middle')
    .text('Distribution of carbon in the soil');
    */

barGroup.append('text')
    .attr('class', 'bar-label')
    .attr('fill',"gray")
    .style('font-size', 12);

barGroup
    .selectAll('bar')
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr('id', function(d){
        return d.id
    })
    .attr("x", function (d) {
        return x(d.class);
    })
    .attr("y", chartLoc.xheight)
    .attr("width", x.bandwidth())
    .attr("height", 0)
    .attr('fill', '#74a063');

}

function easeBar(className) {

    //var ease = d3.easeElastic.period(0.4);

    barGroup.selectAll('#' + className)
        .transition()
        .delay(10)
        .duration(5000)
        .attr("y", function (d) {
            return  y(d.value);
            //return y(ease(d.value)); //chartLoc.xheight -
        })
        .attr("height", function (d) {
            return chartLoc.xheight - y(d.value); //y(ease(d.value));
        })
        .on('end', function(){
            if (className == "soil"){
                d3.selectAll('#soil').attr('fill','brown');
            }
        })

}

drawPie();

//from https://bl.ocks.org/mbostock/3887235
function drawPie(){

    var color = d3.scaleOrdinal(d3.schemeCategory10).domain(pieData.map(function (d) {
        return d.id;
    }));

    var arc = d3.arc()
        .outerRadius(70)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(90)
        .innerRadius(70);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var g = pieChart.selectAll(".arc")
        .data(pie(pieData))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {console.log(d); return color(d.data.id); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.slice; });

}



var timer = 0;

/*
//from https://github.com/d3/d3-timer
var t = d3.timer(
        function(elapsed) { //callback called whenever timer ticks
            //console.log(elapsed);
            if (elapsed > 2500) {
                drawBars();
                t.stop();
        }
    }
    , 150); //sets the delay?
    */