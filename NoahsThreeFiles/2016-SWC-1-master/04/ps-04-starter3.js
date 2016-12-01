var myCanvas = document.getElementById('canvas');
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
  return colorString
};

var drawItem = function(ctx, size) {
  ctx.fillRect(size/-2, size/-2, size, size)
};

var grid = function(numX, numY) {
  var size = Math.floor(myCanvas.width / numX);
  var actualWidth = size * numX;
  var extraSpace = myCanvas.width - actualWidth;
  var padding = extraSpace / 2;
  drawingPad.save();
  drawingPad.translate(size * 0.5 + padding, 0.5 * size);
  for(var x = 0 ; x < numX; x++) {
    for(var y = 0 ; y < numY; y++) {
      var maxSize = (y / numY);
      drawingPad.save();
      drawingPad.translate(x * size, y * size);
      drawingPad.fillStyle = getColor(30, 0, 50 + maxSize * 50, 1);
      drawItem(drawingPad, Math.random() * maxSize * size);
      drawingPad.restore();
    }
  }
  drawingPad.restore()
}

grid(40,40);
