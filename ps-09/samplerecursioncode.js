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
    if(props.scale < minScale) return;  //break point - stops recursion if branches get too small
    ctx.save()  //save the state of the context (keep track of where the branches are)
    ctx.translate(0, growthLength);   //move canvas depending on how big the branch is
    ctx.scale(props.scale, props.scale);   //scale the canvas down for each branch - draws same branch each time, but scale changes
    ctx.rotate(props.angle);               //rotate the canvas to the appropriate angle
    drawBranchShape(); // draw our self

    for(var i = 0; i < 10; i++) {
        var newBranchProps = {}
        var adjustAngle = (Math.random() * maxAngle) - (maxAngle/2)
        var adjustScale = Math.random() * 0.9;
        newBranchProps.angle = props.angle + adjustAngle;  //reset values
        newBranchProps.scale = props.scale * adjustScale;  //reset values
        drawBranch(newBranchProps);  //call self - this is the recursion part!
    };
    ctx.restore();  //return back to the original context to draw the next branch
}
ctx.translate(width/2, height);
drawBranch();  //actually call the drawBranch function to begin recursion