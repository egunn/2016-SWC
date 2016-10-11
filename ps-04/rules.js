var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');
lineArray = []; //store the ingredients for making lines


var x1 = 2*width/3;
var x2 = width;
var y1 = 0;
var y2 = height/2;
var clicked = false;

var angle = Math.atan2(y2-y1, x2-x1);
var fraction = .2;
var branchangle = 18;
var magscale = .9;

var branchpointx, branchpointy, newmagnitude;

generateArray(x1,y1,x2,y2);


function generateArray(x1,y1,x2,y2){

    for (i = 0; i < 332; i++) {

        lineArray.push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });

        branchpointx = x1 + fraction*(x2 - x1);
        branchpointy = y1 + fraction*(y2 - y1);
        newmagnitude = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

        x1 = branchpointx;
        y1 = branchpointy;
        x2 = branchpointx + magscale*Math.sin(-(angle-Math.PI/2)-(i+1)*Math.PI/branchangle)*newmagnitude;
        y2 = branchpointy + magscale*Math.cos(-(angle-Math.PI/2)-(i+1)*Math.PI/branchangle)*newmagnitude;

    }

    drawArray();

}


function drawArray(){
    drawingPad.clearRect(0,0,width,height);

    lineArray.forEach(function (d) {
        drawingPad.beginPath();
        drawingPad.moveTo(d.x1, d.y1);
        drawingPad.lineTo(d.x2, d.y2);
        drawingPad.lineWidth = 1;
        drawingPad.stroke();
    });
}




//from http://jsfiddle.net/sierawski/4xezb7nL/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    drawingPad.clearRect(0,0,width,height);

    if(!clicked){
        drawingPad.beginPath();
        drawingPad.arc(mousePos.x, mousePos.y, 2, 0, 2 * Math.PI, false);
        drawingPad.fillStyle = "gray";
        drawingPad.fill();
        x1 = mousePos.x;
        y1= mousePos.y;
        clicked = true;
    }
    else {
        drawingPad.beginPath();
        drawingPad.moveTo(x1, y1);
        drawingPad.lineTo(mousePos.x, mousePos.y);
        drawingPad.lineWidth = 1;
        drawingPad.stroke();
        clicked = false;
        lineArray =[];
        x2 = mousePos.x;
        y2= mousePos.y;
        angle = Math.atan2(y2-y1, x2-x1);
        generateArray(x1,y1,mousePos.x,mousePos.y);

    }
}, false);


//based on: http://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
document.getElementById('fractionslider').addEventListener('change', function() {
    fraction = document.getElementById('fractionslider').value;
    lineArray = [];
    generateArray(x1,y1,x2,y2);
});

document.getElementById('branchangleslider').addEventListener('change', function() {
    branchangle = document.getElementById('branchangleslider').value;
    lineArray = [];
    generateArray(x1,y1,x2,y2);
});


document.getElementById('scaleslider').addEventListener('change', function() {
   magscale = document.getElementById('scaleslider').value;
    lineArray = [];
    generateArray(x1,y1,x2,y2);
});