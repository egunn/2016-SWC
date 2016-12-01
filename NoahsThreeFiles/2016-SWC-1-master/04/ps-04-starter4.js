var myCanvas = document.getElementById('canvas');
var drawingPad = myCanvas.getContext('2d');
var degToRad = Math.PI/180;

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
  return colorString
};

var drawItem = function(ctx, size, rotation) {
  ctx.fillRect(size/-2,size/-2,size,size);
  ctx.rotate(rotation * degToRad);
  ctx.beginPath();
  ctx.moveTo(0,size/-2);
  ctx.lineTo(0,size/2);
  ctx.stroke();
};

var grid = function(numX, numY) {
  var size = Math.floor(myCanvas.width / numX);
  var actualWidth = size * numX;
  var extraSpace = myCanvas.width - actualWidth;
  var padding = extraSpace / 2;
  drawingPad.save();
  drawingPad.translate(size * 0.5 + padding, 0.5 * size + padding);
  drawingPad.strokeStyle = getColor(0,0,90,1);
  for(var x = 0 ; x < numX; x++) {
    for(var y = 0 ; y < numY; y++) {
      var xFact = (x / numX);
      var yFact = (y / numY);
      drawingPad.save();
      drawingPad.translate(x * size, y * size);
      // drawItem(drawingPad, size * 0.4,  (x / y) * 180);
      drawItem(drawingPad, size * yFact,  (xFact * 180) - (yFact * 180) );
      drawingPad.restore();
    }
  }
  drawingPad.restore()
}

grid(20,20);
