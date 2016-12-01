var myCanvas = document.getElementById('canvasElm');
var drawingPad = myCanvas.getContext('2d');

// @params:
// hue -- number 0-360 (think color wheel degrees)
// saturation number 0-100
// lightness  number 0-100  0 == maximum-dark, 100 == maximum-light
// alpha  number 0-1  0 == transparent, 0.5 == half opaque, 1 == solid
var getColor = function(hue, saturation, lightness, alpha) {
  var colorString = "hsla(" +
    hue + ", "
    + saturation + "%,"
    + lightness  + "%,"
    + alpha + ")";
  return colorString;
};

var drawSquare = function(x,y,size) {
  drawingPad.fillRect(x * size, y * size, size , size);
  drawingPad.strokeStyle = getColor(0, 0, 100, 0.3);
  drawingPad.strokeRect(x * size, y * size, size, size);
}

var size = 50;
var numX = 10;
var numY = 10;
var randomLightness = 0;

for(var x = 0 ; x < numX; x++) {
  for(var y = 0 ; y < numY; y++) {
    randomLightness = Math.random() * 100;
    drawingPad.fillStyle = getColor(0, 0, randomLightness, 0.5);
    drawSquare(x,y,size);
  }
}
