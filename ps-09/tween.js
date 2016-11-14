//tween is a library that saves you from calculating intermediate states

var width = 500;
var height = 500;
var ctx = document.getElementById('canvas').getContext('2d');
var animationSeconds = 10;
var drawingProps = { x: 0, y: 0, rotation:0 };  //define drawing properties as parameters in an object

//tween is an animation library that takes any numeric input as a starting condition
//define start and end attributes
var tween = new TWEEN.Tween(drawingProps)
    .to({ x: width, y: height, rotation: 20 * Math.PI}, animationSeconds * 1000)  //end attributes - final states, animation duration
    .onUpdate(repaint)  //do this when the screen updates
    .repeat(Infinity)
    // .easing(TWEEN.Easing.Cubic.In)  //easing makes it slow at beginning and slower toward the end - timing for nonlinear animation
    .start();

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
    ctx.translate(drawingProps.x, drawingProps.y);  //drawingProps auto updated by Tween library; place ctx in right place for drawing
    ctx.rotate(drawingProps.rotation);
    drawCenteredSquare()
    ctx.restore();
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);  //do the scheduled tween animations - time keeps track of values from last time it was called
    repaint();           //repaint the canvas
};

requestAnimationFrame(animate);  //browser calls when it can; we don't tell it when to update