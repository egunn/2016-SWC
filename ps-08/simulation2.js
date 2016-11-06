var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;

var drawingPad = canvas.getContext('2d');

//set up some basic parameters
var branchPoint = 100;
var branchAngle = Math.PI/3;
var branchScale = .8;
var randomness = 10;
var numBranches = 1;

//set up tree, with a starting stem
var tree = [makeBranch()];


//call main window to begin animation
main();


//frame rate control from http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
//set up vars for controlling frame rate

var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//main loop
function main() {

    // Request animation frames - tells the browser to run this function before the browser refreshes.
    //Removing this returns a static window
    window.requestAnimationFrame(main);

    now = Date.now();
    delta = now - then;

    if (delta > interval) { //update time

        // Just `then = now` is not enough. Lets say we set fps at 10 which means
        // each frame must take 100ms. Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until delta > interval === true
        // Eventually this lowers down the FPS as 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms by subtracting delta (112) % interval (100).
        then = now - (delta % interval);

        //clear the canvas for redrawing
        drawingPad.fillStyle = "hsla(0,0%,100%,1)";
        drawingPad.fillRect(0, 0, width, height);

        //draw
        drawTree();

        //update
        updateTree();

        //reset

    }
}


function makeBranch(parentXend, parentYend, parentLength, parentAngle) {

    if(!parentXend){
        return {x1:width/2, y1:height, length:0, desiredLength:branchPoint, angle:Math.PI, growing:true}
    }
    else{
        return [{x1:parentXend, y1:parentYend, length:0, desiredLength:parentLength*branchScale+randomness*Math.random(), angle:parentAngle+(branchAngle*branchScale+((Math.PI/180)*.5*randomness*branchAngle*Math.random())), growing:true},
               {x1:parentXend, y1:parentYend, length:0, desiredLength:parentLength*branchScale+randomness*Math.random(), angle:parentAngle-(branchAngle*branchScale+((Math.PI/180)*.5*randomness*branchAngle*Math.random())), growing:true}]
    }

}

function drawTree(){
    drawingPad.lineWidth = '1';

    tree.forEach(function(d){

        if(d.growing === false){
            drawingPad.strokeStyle = "black";
            drawingPad.beginPath();
            drawingPad.moveTo(d.x1, d.y1);
            drawingPad.lineTo(d.x2, d.y2);
            drawingPad.stroke();
        }
        else{
            drawingPad.strokeStyle = "gray";
            drawingPad.beginPath();
            drawingPad.moveTo(d.x1, d.y1);
            drawingPad.lineTo((d.x1 + Math.sin(d.angle)*d.length), (d.y1 + Math.cos(d.angle)*d.length));
            drawingPad.stroke();
        }

    });


}

function updateTree(){

    //copy the old array values into a new variable, and cut all ties to the previous version
    //var oldArray = this.array.slice();

    //make a new array to hold new list of points (can't use this.array = [] here; passes the wrong reference
    //this.array = this.array.splice();

    //return this.array;

    if (tree.length <= 15){
        tree.forEach(function(d,i){
            if(d.growing === true){
                d.length += 5;

                if(d.length >= d.desiredLength){

                    d.growing = false;
                    d.x2 = d.x1+Math.sin(d.angle)*d.desiredLength;
                    d.y2 = d.y1+Math.cos(d.angle)*d.desiredLength;

                    var branches = [];
                    for (var i =0; i < numBranches; i++){
                        //returns a pair of positive and negative branches, stored in an array
                        branches.push(makeBranch(d.x1+Math.sin(d.angle)*d.desiredLength,d.y1+Math.cos(d.angle)*d.desiredLength,d.desiredLength, d.angle));
                    }
                    branches.forEach(function(d){
                        //push each array element in separately
                        tree.push(d[0],d[1]);
                    });

                }
            }

        });

    }

    //console.log(tree);

}


//read in values from the sliders whenever the user changes them
//based on: http://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
document.getElementById('fractionslider').addEventListener('change', function() {
    branchPoint = document.getElementById('fractionslider').value;  //store the new slider value

    //empty out the previous tree
    tree = [];
    tree = [makeBranch()];
});

document.getElementById('branchangleslider').addEventListener('change', function() {
    branchAngle = Math.PI/(30-document.getElementById('branchangleslider').value);

    //empty out the previous tree
    tree = [];
    tree = [makeBranch()];
});


document.getElementById('scaleslider').addEventListener('change', function() {
    branchScale = document.getElementById('scaleslider').value;

    //empty out the previous tree
    tree = [];
    tree = [makeBranch()];
});

document.getElementById('randomslider').addEventListener('change', function() {
    randomness = document.getElementById('randomslider').value;

    //empty out the previous tree
    tree = [];
    tree = [makeBranch()];
});
