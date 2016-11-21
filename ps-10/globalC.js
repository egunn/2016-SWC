//setup page and global variables
//set some margins and record width and height of window
margin = {t: 15, r: 0, b: 25, l: 50};

width = document.getElementById('cBarChart').clientWidth - margin.r - margin.l;
height = 500; //document.getElementById('cBarChart').clientHeight - margin.t - margin.b;

console.log(width, height);

music = document.getElementById('music').play();

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
    {id:"Carbonate",slice:"minerals",value:950},
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
    .attr('transform','translate('+ margin.l + ','+ (40+margin.t) + ')');

pieChart = carbonPlot.append('g')
    .attr('class','pie-group')
    .attr('transform','translate(' + (x('Soil')+ (x.bandwidth()/2) + 45) + ',' + (height/2 +margin.t) + ')');


var narrative = carbonPlot
    .append('text')
    .attr('x',width/2)
    .attr('y',(55+margin.t))
    .attr('fill','lightgray')
    .attr('fill-opacity',1)
    .attr('font-size', '75px')
    .style('text-anchor','middle')
    .text('Carbon');

narrative
    //carbon appear, and then fade
    .transition()
    .duration(8000)
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
    .duration(3000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .on('end', function(){
        var text = d3.select(this);
        wrap(text, 'Most of the world\'s carbon is stored in the oceans.', width/2-50)
    })
    //.call(wrap, 'Most of the world\'s carbon is stored in the oceans.', 30)
    //.text('Most of the world\'s carbon is stored in the oceans.')

    .transition()
    .delay(500)  //need to add a delay to allow the wrap function to finish before the transition runs
    .attr('font-size', '24px')
    //fade back in
    .duration(3000)
    .attr('fill-opacity',1)

    .transition()
    .delay(1000)
    .on("end",function(){
        drawBars();
        easeBar('oceans');
    })


    //fade out the text again
    .transition()
    .duration(3000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('By comparison, a lot less is in the atmosphere')
    .on("end",function(){
        easeBar('atmosphere');
    })

    //fade back in
    .duration(3000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .on('end', function(){
        var text = d3.select(this);
        wrap(text, 'Coal, oil, and gas reserves contain about 5x as much carbon', width/2-50);
        easeBar('oil');
    })

    //fade back in
    .transition()
    .delay(1000)  //need to add a delay to allow the wrap function to finish before the transition runs
    .duration(4000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1500)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(500)
    .text('And all life on earth uses just a fraction of that amount')
    .on("end",function(){
        easeBar('living');
    })

    //fade back in
    .duration(3000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1500)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(2500)
    .text('After fossil fuels, soil stores the most carbon on land')
    .on("end",function(){
        easeBar('soil');
    })

    //fade back in
    .duration(3000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(1000)
    .text('Several different forms of carbon are present in healthy soil')
    .on("end",function(){
        d3.selectAll('#soil').attr('fill','brown')
            .on('end',drawPie());
    })

    //fade back in
    .duration(4000)
    .attr('fill-opacity',1)

    //fade out the text again
    .transition()
    .duration(1000)
    .attr('fill-opacity',0)

    //replace the text value
    .transition()
    .delay(1000)
    .on("end",function(){
        var text = d3.select(this);
        wrap(text, 'Increasing soil organic carbon (humus) is the best way to improve soil carbon storage', width/2);
        d3.selectAll('#soil').attr('fill','brown');
        drawPie();
    })

    //fade back in
    .transition()
    .delay(1000)
    .duration(3000)
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

    /*
var yAxis = barGroup.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y)
        .ticks(5));
//.tickFormat(d3.formatPrefix(",.0", 1e6)));

yAxis.selectAll('text')
    .attr('fill',"gray");
     */
/*
barGroup.append('text')
    .attr('x', width/2-15)
    .attr('y', -10)
    .style('font-size', 14)
    .attr('fill',"gray")
    .style('text-anchor', 'middle')
    .text('Distribution of carbon in the soil');
    */


var bars = barGroup
    .selectAll('bar')
    .data(data)
    .enter();

bars
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

bars.append('text')
    .attr('class', 'bar-label')
    .attr('id',function(d){
        return "label-" + d.id
    })
    .attr('fill',"gray")
    .style('font-size', 12);

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
        .on('end', function(d){

            barGroup.selectAll('#' + "label-" + className)
                .style('text-anchor','middle')
                .attr('x',(x(d.class)) + (x.bandwidth()/2)) //x.bandwidth()
                .attr('y',(y(d.value)-7))
                .text(d.value.toLocaleString());
/*
            if (className == "soil"){

            }*/
        })




}


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
        .style("fill", function(d) {return color(d.data.id); })
        .transition()
        .duration(1000)
        .attrTween("d", tweenPie);
        //.attr("d", arc);

    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dx", function(d){
            if(d.data.slice == "peat"){
                return '.25em';
            }
            else if (d.startAngle > Math.PI){
                return '-.5em';
            }
            else{
                return '.5em';
            }
        })
        .attr('dy', function(d){
            if (d.data.slice == 'peat'){
                return '-.5em';
            }
        })
        .style('text-anchor', function(d){
            if (d.startAngle > Math.PI){
                return 'end';
            }
            else{
                return 'start';
            }
        })
        .attr('fill','gray')
        .text(function(d) {console.log(d); return d.data.slice; });

    //from http://bl.ocks.org/mbostock/4341574
    function tweenPie(b) {
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) { return arc(i(t)); };
    }

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


//from http://stackoverflow.com/questions/24784302/wrapping-text-in-d3
function wrap(text, wordList, width) {
    text.each(function () {
        var text = d3.select(this),
            words = wordList.split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.3, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", ++lineNumber * lineHeight + dy + "em")
                    .text(word);
            }
        }
    });
}

