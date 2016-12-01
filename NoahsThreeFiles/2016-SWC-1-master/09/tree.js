var width = 500;
var height = 500;
var minScale = 0.2;
var maxAngle = 1;
var growthLength = -100;
var numBranches = 2;

var ctx = document.getElementById('canvas').getContext('2d');

function drawBranchShape() {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(-2,0);
  ctx.lineTo(-2,growthLength);
  ctx.lineTo(2,growthLength);
  ctx.lineTo(2,0);
  ctx.closePath();
  ctx.fill();
};

function drawBranch(properties) {
  var defaultProps = { scale: 1, angle: 0};
  var props = properties || defaultProps;
  if(props.scale < minScale) return;
  ctx.save()
  ctx.translate(0, growthLength);
  ctx.scale(props.scale, props.scale);
  ctx.rotate(props.angle);
  drawBranchShape(); // draw our self

  for(var i = 0; i < 10; i++) {
    var newBranchProps = {}
    var adjustAngle = (Math.random() * maxAngle) - (maxAngle/2)
    var adjustScale = Math.random() * 0.9;
    newBranchProps.angle = props.angle + adjustAngle;
    newBranchProps.scale = props.scale * adjustScale;
    drawBranch(newBranchProps);
  };
  ctx.restore();
}
ctx.translate(width/2, height);
drawBranch();
