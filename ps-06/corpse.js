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

var egunn = {};

//pre-load the image and then call the drawImage function
var drawImage = function(filename, ctx, x, y) {
    var img = document.createElement("img");  //make an img tag, but don't write it to the DOM
    img.src = filename;  //connect a filename to the tag you loaded (will begin to load, because it has a link and a tag)
    img.addEventListener("load", function() {  //define a callback function to run when the image has loaded
        ctx.drawImage(img, x, y); 
    });
}

egunn.drawGrid = function(ctx) {
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

egunn.drawArm = function(ctx, left) {

};

egunn.drawLeg = function(ctx, left) {

};


egunn.drawTop = function(ctx) {
    // draw a round head:
    // ctx.beginPath();
    // ctx.arc(horizontalCenter, 120, 120, 0, circleDegrees);
    // ctx.fill();
    //drawImage('head.jpg', ctx, 0, 0);

    //ctx.rotate(-Math.PI/30);

    var topx = 190;
    var topy = 90;
    var bottomx = topx;
    var bottomy = 230;
    var ctrlx = 50;
    var ctrlchange = 20;

    for(var i=0; i<10;i++){
        ctx.beginPath();
        ctx.moveTo(topx,topy);
        ctx.bezierCurveTo(ctrlx,topy-40,  ctrlx,bottomy+40,  bottomx,bottomy); //curve to x,y,  control point x,y  end point x, y
        ctx.lineWidth = 1;
        ctx.stroke();

        ctrlx = ctrlx + ctrlchange;
        if (ctrlx < topx){
            ctrlchange += 6;
        }
        else {
            ctrlchange -= 5;
        }

    }


    ctx.beginPath();
    ctx.moveTo(topx-20,topy+30);
    ctx.lineTo(topx-40,topy+70);
    ctx.lineTo(topx-10,topy+70);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(topx+20,topy+30);
    ctx.lineTo(topx+40,topy+70);
    ctx.lineTo(topx+10,topy+70);
    ctx.fill();
    ctx.stroke();


    ctx.moveTo(topx-50,topy+120);
    ctx.lineTo(topx-10,topy+110);
    ctx.lineTo(topx+20,topy+125);
    ctx.lineTo(topx+50,topy+100);
    //ctx.lineWidth = 12;
    ctx.stroke();

};

egunn.drawMiddle = function(ctx) {
    egunn.drawArm(ctx, true);
    egunn.drawArm(ctx, false);
    // draw the rest of the body...

    //triangle body
    ctx.beginPath();
    ctx.moveTo(190,230);
    ctx.lineTo(125,480);
    ctx.lineTo(275,480);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(170,300);
    ctx.bezierCurveTo(25,200,  200,400,  40,400); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(210,300);
    ctx.bezierCurveTo(325,400,  370,400,  350,300); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();
};

egunn.drawBottom = function(ctx) {
    egunn.drawLeg(ctx, true);
    egunn.drawLeg(ctx, false);
    ctx.beginPath();
    ctx.moveTo(125,480);
    ctx.bezierCurveTo(125,500,  50,620,  240,600); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(275,480);
    ctx.bezierCurveTo(125,500,  200,600,  240,600); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(240,540,  250,520,  300,500); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(240,600,  300,600,  300,500); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();


    //bottom fin
    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(240,640,  250,680,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(260,640,  250,680,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(280,640,  250,680,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(300,640,  250,680,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(300,640,  270,680,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(300,630,  275,640,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240,600);
    ctx.bezierCurveTo(240,600,  300,600,  300,700); //curve to x,y,  control point x,y  end point x, y
    ctx.lineWidth = 1;
    ctx.stroke();

};

egunn.drawCorpse = function(ctx) {
    console.log('called');
    egunn.drawTop(ctx);
    egunn.drawMiddle(ctx);
    egunn.drawBottom(ctx);
    egunn.drawGrid(ctx);
};

//export my function to the window namespace so that it can be accessed by other scripts
window.egunn = egunn;