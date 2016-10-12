var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');

/*
for (var x=0; x<332; x++){
    var begin = Math.random()*height;
    drawingPad.beginPath();
    drawingPad.moveTo(x*(width/333),begin);
    drawingPad.lineTo(x*(width/333),begin+20);
    drawingPad.lineWidth = 1;
    drawingPad.stroke();
}
*/

lineArray = []; //store the ingredients for making lines
l = 1; //keep track of how many lines have been drawn

/*
for (i = 0; i < 332; i++) {
    var cc = Math.floor(Math.random() * 255);
    var x1 = Math.random()*(width-10);
    var x2 = Math.random()*(width-10);
    var y1 =  Math.random() * (height-10);
    var y2 = Math.random() * (height-10);
    lineArray.push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        color: "rgb(" + cc + "," + cc + "," + cc + ")"
    });
}
*/


var x1 = width/2;//Math.random()*(width-10);
var x2 = x1 + (Math.random()-.5)*Math.random()*(width/10);
var y1 =  height/2;//Math.random() * (height-10);
var y2 = y1 + (Math.random()-.5)*Math.random()*(height/10);

for (i = 0; i < 332; i++) {
    console.log(i);
    var cc = Math.floor(Math.random() * 255);

    lineArray.push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        color: "rgb(" + cc + "," + cc + "," + cc + ")"
    });
    x1 = x2;
    y1= y2;
    x2 = x1 + (Math.random()-.5)*Math.random()*(width/2);
    y2 = y1 + (Math.random()-.5)*Math.random()*(width/2);
    if (x2 > width-10 || x2 < 0 || y2 < 0 || y2 > height-10){
        x2 = width/2;
        y2 = height/2;
    }
}


/*
var x1 = width/2;
var x2 = x1 + (Math.random()-.5)*Math.random()*(width/10);
var y1 =  height/2;
var y2 = y1 + (Math.random()-.5)*Math.random()*(height/10);

for (i = 0; i < 332; i++) {
    var cc = Math.floor(Math.random() * 255);
    lineArray.push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        color: "rgb(" + cc + "," + cc + "," + cc + ")"
    });
    magnitude = Math.sqrt((x1 - x2)^2 + (y1 - y2)^2);
    console.log((y1-y2)/(x1-x2));
    if ((y1-y2)/(x1-x2) != Infinity || (y1-y2)/(x1-x2) != -Infinity  ){
            direction = Math.atan((y1-y2)/(x1-x2));
    }
    else{
        direction = 0;
    }
    if (isNaN(direction)){
        direction = 0;
    }
    console.log(magnitude, direction);
    x1 = x2;
    y1= y2;
    x2 = x1;
    y2 = Math.cos(Math.random())*y1 + magnitude;
    if (x2 > width-10 || x2 < 0 || y2 < 0 || y2 > height-10){
        x2 = width/2;
        y2 = height/2;
    }
}
*/

lineArray.forEach(function(d){
    drawingPad.beginPath();
    drawingPad.moveTo(d.x1,d.y1);
    drawingPad.lineTo(d.x2,d.y2);
    drawingPad.lineWidth = 1;
    drawingPad.stroke();
});



