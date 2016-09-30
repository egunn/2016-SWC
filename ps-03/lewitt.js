var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');
//drawingPad.fillStyle = "hsla(0,10%,10%,1)";
//drawingPad.fillRect(0, 0, 20, 20);

var lineArray = []; //store the ingredients for making lines

for (i=0;i<50;i++){
    var cc = Math.floor(Math.random()*255);
    lineArray.push({x1:Math.random()*width, y1:Math.random()*height, x2:Math.random()*width, y2:Math.random()*height, color:"rgb(" + cc + "," + cc + "," + cc +")"});
}

lineArray.forEach(function(d){
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

    //console.log(d.color);
    drawingPad.beginPath();
    drawingPad.lineWidth="1.5";
    drawingPad.strokeStyle = d.color;
    drawingPad.moveTo(d.x1,d.y1);
    drawingPad.lineTo(d.x2, d.y2);
    drawingPad.stroke();
});
