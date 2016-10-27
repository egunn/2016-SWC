var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;

var drawingPad = canvas.getContext('2d');

var particleArray = [];
var tempMouse = {x:null, y:null};

makeArray();

function makeArray() {

    drawingPad.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 200; i++){
        var particle = {
            x:Math.random()*width,
            y:Math.random()*height,
            lifetime:100,
            radius:2
        };

        particleArray.push(particle);
    }

    // Call the main loop
    main(0);
}

function updateArray(){
    particleArray.forEach(function(d){
        if (tempMouse.x != null){
            if (Math.abs(d.x-tempMouse.x) < 100 && Math.abs(d.y-tempMouse.y) < 100){
                var slopeTan = -(d.x-tempMouse.x)/(d.y-tempMouse.y);
                // console.log(Math.sin(slopeTan));
                d.x = d.x + Math.sin(slopeTan);
                d.y = d.y + Math.cos(slopeTan);
            }
        }

        if (d.x > width || d.y > height || d.radius < 0.05){
            d.x = Math.random()*width;
            d.y = Math.random()*height;
            d.lifetime = 100;
            d.radius = 2;
        }

        if (d.lifetime > 0){
            d.x +=1;
            d.y += 1;
            d.lifetime -= 1;
            d.radius -= 0.02;
        }
        else {
            d.x = Math.random()*width;
            d.y = Math.random()*height;
            d.lifetime = 100;
            d.radius = 2;
        }
    })
}


/*
// Main loop
function main(tframe) {
    // Request animation frames - tells the browser to run this function before the browser refreshes.
    //Removing this returns a static window
    //lineArray.forEach(function(d){
    window.requestAnimationFrame(main);

    console.log('main');


}*/





//frame rate control from http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
//set up vars for controlling frame rate

var fps = 1000;
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
        //drawingPad.clearRect(0, 0, width, height);
        drawingPad.fillStyle = "hsla(0,0%,100%,0.1)";
        drawingPad.fillRect(0, 0, width, height);

        updateArray();

        particleArray.forEach(function(d){
            drawingPad.fillStyle = "hsl(0,0%," + (100-d.lifetime) + "% )";
            drawingPad.beginPath();
            drawingPad.arc(d.x, d.y, d.radius, 0, 2 * Math.PI, false);
            drawingPad.fill();
        });


    }
}























//This function listens for when the user clicks with the mouse. When they click, it saves the mouse coordinates
//from http://jsfiddle.net/sierawski/4xezb7nL/
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();  //get the size of the box the canvas is in (so that you can adjust the raw mouse coordinates)

    //when the getMousePos function is called, it will hand back an object to whatever function called it
    return {
        //the object has parameters x and y, and they store the mouse coordinates (they need to be converted to the right pixel
        //values for the canvas
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

/*
canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);

}, false);
*/


canvas.addEventListener('mousemove', function(evt) {

    //var mousePos = getMousePos(canvas, evt);
    //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    if (evt.offsetX < width && evt.offsetY < height){
        tempMouse = {x:evt.offsetX, y:evt.offsetY};
    }
    else {
        tempMouse = {x:null, y:null};
    }

}, false);

/*
var draw = function(x,y){
    drawingPad.fillRect(x,y,1,1);
};

var mouseMoveHandler = function(event){
    draw(event.offsetX, event.offsetY)
};

canvas.addEventListener('mousemove',mouseMoveHandler);
*/