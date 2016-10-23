var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;

var backgroundColor = '#882493';
var bubbleColor = "#6ca31a";

var drawingPad = canvas.getContext('2d');
var greatRadius = 9;
var radius = .45;
var offset = 0;
var multiplier = 1.15;

drawIllusion();

function drawIllusion() {

    canvas.style.backgroundColor = backgroundColor;

for (var j = 0; j< 35; j++) {

    if (isEven(j) === true) {
        offset = 0;
    }
    else{
        offset = 1;
    }

    for (var i = 0; i < 30; i++) {
        var angle = 2 * i * Math.PI / 30 + offset * Math.PI / 30;
        var centerX = greatRadius * Math.sin(angle) + width / 2;
        var centerY = greatRadius * Math.cos(angle) + height / 2;

        drawingPad.fillStyle = "white";
        drawingPad.beginPath();
        drawingPad.arc(centerX, centerY, radius*1.3, -angle+Math.PI/2, -angle-Math.PI/2, false);
        drawingPad.fill();

        drawingPad.fillStyle = "black";
        drawingPad.beginPath();
        drawingPad.arc(centerX, centerY, radius*1.3, -angle-Math.PI/2, -angle+Math.PI/2, false);
        drawingPad.fill();


        drawingPad.fillStyle = bubbleColor;
        drawingPad.beginPath();
        drawingPad.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        drawingPad.fill();

    }
    greatRadius = greatRadius * multiplier;
    radius = radius * multiplier;

    if(j==34){
        drawingPad.fillStyle = "white";
        drawingPad.beginPath();
        drawingPad.arc(width/2, height/2, 17, Math.PI/4, Math.PI+3*Math.PI/4, false);
        drawingPad.fill();

        drawingPad.fillStyle = "black";
        drawingPad.beginPath();
        drawingPad.arc(width/2, height/2, 17, -Math.PI/4, Math.PI - Math.PI/4, false);
        drawingPad.fill();

        drawingPad.fillStyle = bubbleColor;
        drawingPad.beginPath();
        drawingPad.arc(width/2, height/2, 15, 0, 2 * Math.PI, false);
        drawingPad.fill();
    }
}
}


function updateForeground(jscolor) {
    bubbleColor = '#' + jscolor;
    drawingPad.clearRect(0,0,width,height);
    greatRadius = 9;
    radius = .45;
    offset = 0;
    multiplier = 1.15;
    drawIllusion();
}


function updateBackground(jscolor) {
    //console.log('#' + jscolor);
    backgroundColor = '#' + jscolor;
    drawingPad.clearRect(0,0,width,height);
    greatRadius = 9;
    radius = .45;
    offset = 0;
    multiplier = 1.15;
    drawIllusion();
}


function isEven(n) { return n % 2 == 0; }
