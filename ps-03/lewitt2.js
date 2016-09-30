var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var lineArray;
var l; //keep track of how many lines have been drawn
var t; //keep track of how many points (steps along line) to move
var drawingPad = canvas.getContext('2d');
//drawingPad.fillStyle = "hsla(0,10%,10%,1)";
//drawingPad.fillRect(0, 0, 20, 20);
makeArray();

function makeArray() {

    lineArray = []; //store the ingredients for making lines
    l = 1; //keep track of how many lines have been drawn
    t = 1; //keep track of how many points (steps along line) to move
    drawingPad.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < 50; i++) {
        var cc = Math.floor(Math.random() * 255);
        lineArray.push({
            x1: Math.random() * width,
            y1: Math.random() * height,
            x2: Math.random() * width,
            y2: Math.random() * height,
            color: "rgb(" + cc + "," + cc + "," + cc + ")"
        });
    }

    lineArray.forEach(function (d) {
        //thanks to http://jsfiddle.net/m1erickson/7faRQ/ for help figuring out the animation of paths
        // calc waypoints traveling along vertices

        var waypoints = [];
        var dx = d.x2 - d.x1;
        var dy = d.y2 - d.y1;
        for (var j = 0; j < 100; j++) {
            var x = d.x1 + dx * j / 100;
            //console.log(x);
            var y = d.y1 + dy * j / 100;
            waypoints.push({
                x: x,
                y: y
            });
        }

        d.waypoints = waypoints;

    });

    // Call the main loop
    main(0);
}

// Main loop
function main(tframe) {
    // Request animation frames - tells the browser to run this function before the browser refreshes.
    //Removing this returns a static window
    //lineArray.forEach(function(d){
    window.requestAnimationFrame(main);

        test = lineArray[l];

        if (t < test.waypoints.length - 1) {

            drawingPad.beginPath();
            drawingPad.lineWidth="1.5";
            drawingPad.strokeStyle = test.color;
            drawingPad.moveTo(test.waypoints[t - 1].x, test.waypoints[t - 1].y);
            drawingPad.lineTo(test.waypoints[t].x, test.waypoints[t].y);
            drawingPad.stroke();
            t++;
        }


        if(t == 99){
            l++;
            t = 1;
        }

        if(l >= 50){
            makeArray();
        }

}


