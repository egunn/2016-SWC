var myCanvas = document.getElementById('canvas');
var drawingPad = myCanvas.getContext('2d');
var degToRad = Math.PI/180;

// @params:
//   hue – number (0-360 think color wheel degrees)
//   saturation – number (0-100 think % saturated)
//   lightness – number (0-100 think % light)
//   alpha – number (0-1  0 == transparent, 0.5 == half opaque, 1 == solid)
var getColor = function(hue, saturation, lightness, alpha) {
  var colorString = "hsla(" +
    hue + ", "
    + saturation + "%,"
    + lightness  + "%,"
    + alpha + ")";
  return colorString
};


// drawSquare: parameters:
//   ctx – the drawing context
//   color: – the color of the square
//   size: – the size of the square
var drawSquare = function(ctx, color, size) {
  ctx.fillStyle = color;
  ctx.fillRect(size/-2, size/-2, size, size);
}


// drawItem: parameters:
//   ctx – the drawing context
//   gridSpacing: – how big the grid spacing is.
//   rotation: – how much to rotate our item before drawing it.
var drawItem = function(ctx, gridSpacing, rotation, scale) {
  var darkColor  = getColor(0,0,10,1);
  var darkSize   = gridSpacing;

  var lightColor = getColor(0,0,50,1);
  var lightSize  = gridSpacing / 2;
  ctx.save();

  ctx.scale(scale, scale);               // ⬅ scale our drawing
  ctx.rotate(rotation * degToRad);       // ⬅ rotate the canvas

  // draw the dark box
  drawSquare(ctx, darkColor, darkSize);

  // draw the light box
  drawSquare(ctx, lightColor, lightSize);
  ctx.restore();
};


// adjustCanvasPadding: parameters:
//   ctx – the drawing context
//   gridSpacing: – how big the grid spacing is.
//   rotation: – how much to rotate our item before drawing it.
var adjustCanvasPadding = function(ctx, contentWidth, contentHeight) {
  var extraHeight = myCanvas.height - contentHeight;
  var extraWidth  = myCanvas.width  - contentWidth;
  var verticalPadding = Math.floor(extraHeight / 2);
  var horizontalPadding = Math.floor(extraWidth / 2);
  ctx.translate(horizontalPadding, verticalPadding);
}


// drawGrid: parameters:
//   numX: – how wide our grid is in grid-units.
//   numY: – how tall our grid is in grid-units.
var drawGrid = function(numX, numY) {
  var gridSize = Math.floor(myCanvas.width / numX);
  var actualWidth = gridSize * numX;
  var actualHeight = gridSize * numY;
  var rotation = 0;

  adjustCanvasPadding(drawingPad, actualWidth, actualHeight);
  drawingPad.translate(gridSize * 0.5, 0.5 * gridSize);

  for(var y = 0 ; y < numY; y++) {
    for(var x = 0 ; x < numX; x++) {
      var xOffset = x * gridSize;
      var yOffset = y * gridSize;
      var scale = ((y+1)/numY) * 0.8;           // ⬅ draw items bigger as Y increases

      rotation = rotation + 1;
      drawingPad.save();
      drawingPad.translate(xOffset, yOffset);   // ⬅ move the paper to the right grid location
      drawItem(drawingPad, gridSize, rotation, scale);
      drawingPad.restore();                     // ⬅ move the paper back
    }
  }
}

drawGrid(30,20);
