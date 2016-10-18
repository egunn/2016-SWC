var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');
var boxSize = 10;

drawBoxes(boxSize);

function drawBoxes(boxSize){
    for (var x=0; x<=20; x++){
        for (var y=0; y<=20; y++){
            drawingPad.fillStyle = "black";
            drawingPad.fillRect(x*width/20+(width/80), y*height/20+(height/80), boxSize, boxSize);
        }
    }
}

document.getElementById('sizeslider').addEventListener('change', function() {
    drawingPad.clearRect(0,0,width,height);
    boxSize = document.getElementById('sizeslider').value;
    console.log(boxSize);
    drawBoxes(boxSize);
});