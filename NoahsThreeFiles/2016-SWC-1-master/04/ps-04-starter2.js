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

var snapToGrid = function(x, y, gridspacing) {
  var columnCount = Math.floor(myCanvas.width / gridspacing);
  var rowCount    = Math.floor(myCanvas.height / gridspacing);
  var remainingWidth  = myCanvas.width - (gridspacing * columnCount);
  var remainingHeight = myCanvas.height - (gridspacing * columnCount);
  var xOffset = remainingWidth  / 2;
  var yOffset = remainingHeight / 2;
  return {
    x: xOffset + (x * gridspacing) - (gridspacing / 2),
    y: yOffset + (y * gridspacing) - (gridspacing / 2),
  }
}

//
//
//
var drawItem = function(centerX, centerY, size) {
  var snapPoint = snapToGrid(centerX, centerY, size);
  drawingPad.fillRect(snapPoint.x, snapPoint.y, size-2, size-2);
};

var grid = function(numX, numY) {
  var size = Math.floor(myCanvas.width / numX) + 1;
  for(var x = 0 ; x < numX; x++) {
    for(var y = 0 ; y < numY; y++) {
      drawingPad.fillStyle = getColor(30, 4 * y, 5 * x, 0.5)
      drawItem(x, y, (x + y) * 30);
    }
  }
}

grid(12,12);
