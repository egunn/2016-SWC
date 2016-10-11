var canvas = document.getElementById('canvas');

//The canvas context is where you store things that you want to draw to the canvas. So here, I'm storing the
//context inside the variable drawingPad for later use. 
var drawingPad = canvas.getContext('2d');

//set the style to the color I want
drawingPad.fillStyle = "hsla(0,10%,10%,1)";
//draw a rectangle (using that color)
drawingPad.fillRect(0, 0, 70, 70);

//set the color to a different color 
drawingPad.fillStyle = "hsla(0,10%,10%,.7)";
//draw another rectangle 
drawingPad.fillRect(200, 200, 300, 300);

drawingPad.fillStyle = "hsla(0,10%,10%,0.02)";
drawingPad.stroke = "black";
drawingPad.fillRect(120, 120, 450, 450);