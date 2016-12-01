var width = 500;
var height = 500;
var ctx = document.getElementById('canvas').getContext('2d');
var animationSeconds = 5;
var drawingProps = { x: 0, y: 0, rotation:0 };

var tween = new TWEEN.Tween(drawingProps);
tween.to({ x: width, y: height, rotation: 20 * Math.PI}, animationSeconds * 1000)
tween.onUpdate(repaint)
tween.repeat(Infinity)
tween.easing(TWEEN.Easing.Cubic.InOut)
tween.start();

function clearScreen() {
  ctx.fillStyle = 'hsla(0,0%,0%,1)';
  ctx.fillRect(0,0,width,height);
};

function drawCenteredSquare() {
  ctx.fillStyle = 'white';
  ctx.fillRect(-5,-5,10,10);
}

function repaint() {
  clearScreen();
  ctx.save();
  ctx.translate(drawingProps.x, drawingProps.y);
  ctx.rotate(drawingProps.rotation);
  drawCenteredSquare()
  ctx.restore();
}

function animate(time) {
    TWEEN.update(time);
    repaint();
    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
