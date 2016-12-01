var myCanvas = document.getElementById('corpse');
var drawingPad = myCanvas.getContext('2d');
var circleDegrees = 2 * Math.PI;
var y0  = 0;
var y1 = 240;
var y2 = 480;
var height = y3 = 720;
var x0 = 0;
var x1 = 125; // left connection
var x2 = 275; // right connection
var width = x3 = 400;
var horizontalCenter = 200; // centerLine

var knowuh = {};

var drawImage = function(filename, ctx, x, y) {
  var img = document.createElement("img");
  img.src = filename;
  img.addEventListener("load", function() {
    ctx.drawImage(img, x, y);
  });
}

knowuh.drawGrid = function(ctx) {
  ctx.beginPath();
  ctx.moveTo(x1,y0);
  ctx.lineTo(x1,y3);

  ctx.moveTo(x2,y0);
  ctx.lineTo(x2,y3);

  ctx.moveTo(x1,y0);
  ctx.lineTo(x1,y3);

  ctx.moveTo(x0,y1);
  ctx.lineTo(x3,y1);

  ctx.moveTo(x0,y2);
  ctx.lineTo(x3,y2);
  ctx.stroke();
}

knowuh.drawArm = function(ctx, left) {

};

knowuh.drawLeg = function(ctx, left) {

};


knowuh.drawTop = function(ctx) {
  // draw a round head:
  // ctx.beginPath();
  // ctx.arc(horizontalCenter, 120, 120, 0, circleDegrees);
  // ctx.fill();
  drawImage('//knowuh.github.io/2016-SWC/06/head.jpg', ctx, 0, 0);
};

knowuh.drawMiddle = function(ctx) {
  knowuh.drawArm(ctx, true);
  knowuh.drawArm(ctx, false);
  // draw the rest of the body...
};

knowuh.drawBottom = function(ctx) {
  knowuh.drawLeg(ctx, true);
  knowuh.drawLeg(ctx, false);
};

knowuh.drawCorpse = function(ctx) {
  knowuh.drawTop(ctx);
  knowuh.drawMiddle(ctx);
  knowuh.drawBottom(ctx);
  knowuh.drawGrid(ctx);
};

window.knowuh = knowuh;
