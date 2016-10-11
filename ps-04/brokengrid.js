var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');
//drawingPad.fillStyle = "hsla(0,10%,10%,1)";
//drawingPad.fillRect(0, 0, 20, 20);



/*for (var x=0; x<=8; x++){
    for (var y=0; y<=8; y++){
        drawingPad.fillStyle = "hsla(0,30%," + 10 * x+ "%,1)";
        drawingPad.fillRect(x*50, y*50, 6* x, 6*y);
    }
}*/

/*for (var x=0; x<333; x++){
    drawingPad.fillStyle =  "hsla(0,30%," + 10 * x+ "%,1)";
    drawingPad.beginPath();
    drawingPad.moveTo(x*5,x*70);
    drawingPad.lineTo(450,150);
    drawingPad.stroke();
}*/

/*for (var x=0; x<333; x++){
    drawingPad.beginPath();
    drawingPad.moveTo(x*x*2,x*20);
    drawingPad.quadraticCurveTo(20,600,200,400);
    drawingPad.stroke();
}*/

/*
for (var x=0; x<333; x++){
    drawingPad.beginPath();
    drawingPad.moveTo(x*x*2,x*Math.random());
    drawingPad.quadraticCurveTo(250*Math.sin(x),600*Math.cos(x),300*Math.sin(x),500*Math.sin(x));
    drawingPad.stroke();
}*/


/*
for (var x=0; x<333; x++){
    drawingPad.beginPath();
    drawingPad.moveTo(20*Math.sin(x)+width/2,20*Math.cos(x)+width/2);
    drawingPad.lineTo(250*Math.sin(x)+width/2,250*Math.cos(x)+width/2);
    drawingPad.stroke();
}*/

/*
for (var x=0; x<100; x++){
    drawingPad.strokeStyle = "hsla(0,10%,10%," + 1*Math.sin(x) + ")";
    drawingPad.beginPath();
    drawingPad.moveTo(20*Math.sin(x)+width/2,20*Math.cos(x)+450);
    drawingPad.quadraticCurveTo(50,500*Math.sin(x),600*Math.sin(x),100*Math.random());
    drawingPad.stroke();
}*/


//frame rate control from http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
//set up vars for controlling frame rate

var fps = 1;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//main loop
function main() {

    window.requestAnimationFrame(main);


    if (document.getElementById("fps").value){
        fps = document.getElementById("fps").value;
        interval = 1000/fps;
    }

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
        drawingPad.clearRect(0, 0, width, height);

        // Request animation frames - tells the browser to run this function before the browser refreshes.
        //Removing this returns a static window
        window.requestAnimationFrame(main);

        //draw the points
        for (var x=0; x<=8; x++){
            for (var y=0; y<=8; y++){

                drawingPad.beginPath();
                drawingPad.arc(x*50+50, y*50+50, Math.random()*10, 0, 2 * Math.PI, false);
                drawingPad.fillStyle = "hsla(0,0%,0%,"+(x*y/64+.2)+")";
                drawingPad.fill();

            }
        }

    }
}

// Call the main loop
main(0);
