var canvas = document.getElementById('canvas');
var drawingPad = canvas.getContext('2d');
drawingPad.fillStyle = "hsla(0,10%,10%,1)";
drawingPad.fillRect(0, 0, 70, 70);


drawingPad.fillStyle = "hsla(0,10%,10%,.7)";
drawingPad.fillRect(200, 200, 300, 300);

drawingPad.fillStyle = "hsla(0,10%,10%,0.02)";
drawingPad.stroke = "black";
drawingPad.fillRect(120, 120, 450, 450);