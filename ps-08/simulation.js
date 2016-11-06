var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;

var drawingPad = canvas.getContext('2d');

//Based on the Koch snowflake demo by Ben Fry and Casey Reas for p5.js: http://processingjs.org/learning/topic/koch/

//create snowflake object and methods
var kochSnowflake = createSnowflake();
//call main window to begin animation
main();

//frame rate control from http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
//set up vars for controlling frame rate

var fps = 2;
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

        //draw the snowflake
        kochSnowflake.draw();

        //update the snowflake
        kochSnowflake.array = kochSnowflake.update();

        //reset the simulation after 10 cycles
        if (kochSnowflake.cycles > 5){
            kochSnowflake.restart();
        }

    }
}

function createSnowflake(){
    //console.log('create');

    var start = {x:0,y:height/2};
    var end = {x:width,y:height/2};

    return {
        array: [start, end],
        cycles: 0,

        draw: function(){
            //console.log("draw Snowflake");
            //console.log(this.array);

            drawingPad.lineWidth = '1';
            drawingPad.strokeStyle = "gray";
            drawingPad.beginPath();

            this.array.forEach(function(d,i){
                //console.log(d);
                if (i == 0){
                    drawingPad.moveTo(d.x,d.y);
                }
                else{
                    drawingPad.lineTo(d.x, d.y)
                }
            });

            drawingPad.stroke();
        },

        update: function(){

            //copy the old array values into a new variable, and cut all ties to the previous version
            var oldArray = this.array.slice();

            //make a new array to hold new list of points (can't use this.array = [] here; passes the wrong reference
            this.array = this.array.splice();

            //go through the oldArray, and add new points as needed (break each line into 4
            for (var i = 0; i < oldArray.length-1; i++){

                    var leftX = ( oldArray[i].x +  (oldArray[i+1].x - oldArray[i].x) /3 );
                    var leftY = ( oldArray[i].y +  (oldArray[i+1].y - oldArray[i].y) /3 ) ;

                    var middleX = oldArray[i].x + 0.5 * ((oldArray[i+1].x - oldArray[i].x) + (Math.sin(Math.PI/3)*((oldArray[i+1].y-oldArray[i].y) / 2)));
                    var middleY = oldArray[i].y + 0.5 * ((oldArray[i+1].y - oldArray[i].y) - (Math.sin(Math.PI/3)*((oldArray[i+1].x-oldArray[i].x) / 2)));

                    var rightX = ( oldArray[i].x +  2*(oldArray[i+1].x - oldArray[i].x) /3 );
                    var rightY = ( oldArray[i].y +  2*(oldArray[i+1].y - oldArray[i].y) /3 ) ;

                    this.array.push(oldArray[i], {x:leftX,y:leftY},{x:middleX,y:middleY},{x:rightX,y:rightY} ,oldArray[i+1]);
            }

            //update iteration counter
            this.cycles += 1;

            return this.array;
        },

        restart: function(){
            //reset values when the right # of iterations has run
            this.array = this.array.splice();
            this.array = [start, end];
            this.cycles = 0;
        }
    }
}



/*
var beginX = 250;
var beginY = 250;

var drawDot = function(){
    var size = 10;
    drawingPad.fillStyle = "gray";
    drawingPad.fillRect(beginX,beginY,size,size) ;
    if (beginX > 500){
        beginX -= 11
    }
    else{
        beginX += 11;
    }

}

//calls drawDot every 100 ms
setInterval(drawDot,100);

*/