//setup page and global variables
//set some margins and record width and height of window
margin = {t: 15, r: 0, b: 25, l: 50};

width = 400;//document.getElementById('cBarChart').clientWidth - margin.r - margin.l;
height = 400; //document.getElementById('cBarChart').clientHeight - margin.t - margin.b;



var thour = [{value:0}], tmins = [{value:0}], tsecs = [{value:0}];

plot = d3.selectAll(".chart")
    .append('svg')
    .attr('class','svg')
    .attr('width', width)
    .attr('height', height)
    .attr('background','lightgray');

function updateTimeData(){
    var d = new Date();
    var hour = d.getHours();
    var mins = d.getMinutes();
    var seconds = d.getSeconds();

    thour[0].value = hour;
    tmins[0].value = mins;
    tsecs[0].value = seconds;

    //console.log(hour, mins, seconds);


    clock.selectAll('.sec')
        .transition()
        .duration(1000)
        .attr('cx',function(d){ return 100*Math.sin((-d.value*Math.PI/30) + Math.PI)+width/2})
        .attr('cy',function(d){ return 100*Math.cos((-d.value*Math.PI/30) + Math.PI)+height/2});

    clock.selectAll('.mins')
        .transition()
        .duration(1000)
        .attr('cx',function(d){ return 80*Math.sin((-d.value*Math.PI/30) + (Math.PI)) + width/2})
        .attr('cy',function(d){ return 80*Math.cos((-d.value*Math.PI/30) + (Math.PI) )+ height/2 });

    clock.selectAll('.hour')
        .transition()
        .duration(1000)
        .attr('cx',function(d){ return 40*Math.sin((-d.value*Math.PI/12) + Math.PI)+width/2})
        .attr('cy',function(d){ return 40*Math.cos((-d.value*Math.PI/12) + Math.PI)+height/2})

}


clock = plot.append('g');

updateTimeData();

clock.append('circle')
    .attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 100)
    .attr('fill', 'none')
    .style('stroke', '#e8ecf2');

clock.append('circle')
    .attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 80)
    .attr('fill', 'none')
    .style('stroke', '#e8ecf2');

clock.append('circle')
    .attr('cx', width/2)
    .attr('cy', height/2)
    .attr('r', 40)
    .attr('fill', 'none')
    .style('stroke', '#e8ecf2');

clock.selectAll('.sec')
    .data(tsecs)
    .enter()
    .append('circle')
    .attr('class','sec')
    .attr('cx',function(d){ return 100*Math.sin((-d.value*Math.PI/30) + Math.PI)+width/2})
    .attr('cy',function(d){ return 100*Math.cos((-d.value*Math.PI/30) + Math.PI)+height/2})
    .attr('fill','gray')
    .attr('r', 2);

clock.selectAll('.mins')
    .data(tmins)
    .enter()
    .append('circle')
    .attr('cx',function(d){ return 80*Math.sin((-d.value*Math.PI/30) + Math.PI)+width/2})
    .attr('cy',function(d){ return 80*Math.cos((-d.value*Math.PI/30) + Math.PI)+height/2})
    .attr('class','mins')
    .attr('fill','gray')
    .attr('r', 3);

clock.selectAll('.hour')
    .data(thour)
    .enter()
    .append('circle')
    .attr('cx',function(d){ return 40*Math.sin((-d.value*Math.PI/12) + Math.PI)+width/2})
    .attr('cy',function(d){ return 40*Math.cos((-d.value*Math.PI/12) + Math.PI)+height/2})
    .attr('class','hour')
    .attr('fill','gray')
    .attr('r', 5);


updateTimeData();
setInterval(updateTimeData, 1000);