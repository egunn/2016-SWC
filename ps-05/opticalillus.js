var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');

/*
for (var x=0; x<32; x++){
 var radians = x*(360/32)*Math.PI/180;
 drawingPad.beginPath();
 drawingPad.moveTo(100*Math.sin(radians + Math.PI/2)+width/2,20*Math.cos(radians + Math.PI/2)+width/2);
 drawingPad.lineTo(250*Math.sin(radians)+width/2,250*Math.cos(radians)+width/2);
 drawingPad.stroke();
}
*/

//draw 33 lines version by default
buttonPress1();

//runs when user presses the button
function buttonPress1(){
    drawingPad.clearRect(0,0,width,height);

    for (var x=0; x<32; x++){
        var radians = x*(360/32)*Math.PI/180;
        drawingPad.beginPath();
        drawingPad.moveTo(90*Math.sin(radians + Math.PI/6)+width/2,30*Math.cos(radians + Math.PI/4)+width/2);
        drawingPad.lineTo(250*Math.sin(radians)+width/2,250*Math.cos(radians)+width/2);
        drawingPad.lineWidth = x/5;
        drawingPad.stroke();
    }
}

function buttonPress2(){

    drawingPad.clearRect(0,0,width,height);

    for (var x=0; x<332; x++){
        var beginx = (width/26 * (x % 25))+width/26;
        var row = Math.floor(x / 25);
        var beginy = row*(height/15) + height/15-10;

        drawingPad.beginPath();
        drawingPad.moveTo(beginx - Math.random()*5,beginy );
        drawingPad.lineTo(beginx + Math.random()*5,beginy + 20);
        drawingPad.lineWidth = 1;
        drawingPad.stroke();
    }
}

