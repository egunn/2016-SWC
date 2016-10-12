var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');
lineArray = []; //store the ingredients for making lines

//set initial values for the line begin and end points
var x1 = 2*width/3;
var x2 = width;
var y1 = 0;
var y2 = height/2;
//tracker variable to keep track of whether the user has clicked on the canvas.
var clicked = false;

//calculate the angle of the line between the two points set up above
var angle = Math.atan2(y2-y1, x2-x1);
//set position along the original line where you will draw the second line (branch point)
var fraction = .2;
//set the angle between lines that you draw
var branchangle = 18;
//set the relative size of the second line (length compared to the first)
var magscale = .9;

//make some variables that will be used to calculate values for the new line points
var branchpointx, branchpointy, newmagnitude;

//call the generate array function (defined below) to actually make the array of points to draw
//Pass the function the values of x1, y1, x2, y2
generateArray(x1,y1,x2,y2);

//set up a function called generateArray that takes four starting points (of the initial line) and
//creates a set of points to draw all of the rest of the lines
function generateArray(x1,y1,x2,y2){

    //make a set of points for 333 lines based on the starting line position
    for (i = 0; i < 332; i++) {

        //.push puts things inside the parentheses into the lineArray.
        //Here, I'm pushing in an object for each line in the set, and the object stores attributes x1, y1, x2, y2 for the line
        lineArray.push({
            x1: x1,  //x1: sets the attribute name that I will use to retrieve these values later.
                     // The second x1 is the value stored in the variable that I handed the function
            y1: y1,
            x2: x2,
            y2: y2
        });

        //calculate the point where the second line should branch off of the first
        branchpointx = x1 + fraction*(x2 - x1);  //find the difference in x for the line, multiply it by the fraction the user chose,
                                                 //and add it to the original x value. This sets the x value for the branch line
        branchpointy = y1 + fraction*(y2 - y1);  //same for y
       magnitude = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));  //calculate the length (magnitude) of the original line

        //Since we've already pushed the point values for the first line into the array, we don't need them anymore.
        //Now, set the values for the next line instead.
        x1 = branchpointx;   //overwrite x1 and y1 with the values calculated for the branchpoint x and y
        y1 = branchpointy;
        //This calculates the end point values for the second lines. Starting at the branch point,
        //add a vector component based on the angle of rotation and the length needed for the new line
        x2 = branchpointx + magscale*Math.sin(-(angle-Math.PI/2)-(i+1)*Math.PI/branchangle)*magnitude;
        y2 = branchpointy + magscale*Math.cos(-(angle-Math.PI/2)-(i+1)*Math.PI/branchangle)*magnitude;

    }

    //call the drawArray function below (don't need to pass it anything, since the array is stored as a global variable)
    drawArray();

}


function drawArray(){

    //clear the canvas
    drawingPad.clearRect(0,0,width,height);

    //.forEach is an array function that goes through every element of an array and does something to it
    //The "something" is defined by the code inside function (d){}. Within that function, d is the object stored
    //in that position in the array.
    lineArray.forEach(function (d) {
        //if you're confused about what d is or what the object looks like, uncomment to print d to the console
        //console.log(d);

        drawingPad.beginPath();         //go to the canvas context, and tell it to start drawing a path
        drawingPad.moveTo(d.x1, d.y1);  //Move to the x1 and y1 values stored in object d
        drawingPad.lineTo(d.x2, d.y2);  //Draw a line to the x2 and y2 values stored for the point at the end of the line
        drawingPad.lineWidth = 1;       //tell it to draw a line a single pixel wide
        drawingPad.stroke();            //actually draw the line
    });
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

//This is the function that actually listens to the mouse being clicked. It is added to the canvas element, so that
//it will only fire when the user clicks inside the canvas
canvas.addEventListener('click', function(evt) {
    //when the user clicks, call the getMousePos function. It will hand back the mouse coordinates, stored in an object
    //with x and y. Store the results in a variable called mousePos for use below.
    var mousePos = getMousePos(canvas, evt);

    //clear the canvas to get rid of the original drawing
    drawingPad.clearRect(0,0,width,height);

    //if the tracker variable clicked is still set to false (like we set it at the beginning), then this must be the first
    //time that the user has clicked on the canvas. In that case, we need to set the x and y values of the first point in the line
    if(!clicked){
        //draw a point at the mouse position where the user clicked.
        drawingPad.beginPath();
        //note that mousePos.x and mousePos.y are retrieving the x anf y parameters from the object that we stored in mousePos
        drawingPad.arc(mousePos.x, mousePos.y, 2, 0, 2 * Math.PI, false);
        drawingPad.fillStyle = "gray";
        drawingPad.fill();
        //set the values of x1 and y1 (will replace the x1 and y1 values set above, so that the user-defined point
        //overwrites our default values)
        x1 = mousePos.x;
        y1= mousePos.y;
        //set the tracker variable to be true, so that next time we'll know that the user has already clicked once
        clicked = true;
    }

    //if the user has already clicked before, this must be the second point
    else {
        //draw a line between the first point and the newly clicked point
        drawingPad.beginPath();
        drawingPad.moveTo(x1, y1);
        drawingPad.lineTo(mousePos.x, mousePos.y);
        drawingPad.lineWidth = 1;
        drawingPad.stroke();
        //reset the click value so that the next click will start a new line
        clicked = false;
        //clear out all of the data in the lineArray
        lineArray =[];
        //set the values of x2 and y2 using the mouse coordinates
        x2 = mousePos.x;
        y2= mousePos.y;
        //reset the angle, based on the user-drawn line
        angle = Math.atan2(y2-y1, x2-x1);
        //call the generateArray function to make a new set of lines to draw, and pass it the starting values
        //based on the mouse coordinates
        generateArray(x1,y1,mousePos.x,mousePos.y);

    }
}, false);

//read in values from the sliders whenever the user changes them
//based on: http://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
document.getElementById('fractionslider').addEventListener('change', function() {
    fraction = document.getElementById('fractionslider').value;  //store the new slider value

    //empty out the lineArray
    lineArray = [];
    //make a new array based on the user's input (new value for fraction, in this case)
    generateArray(x1,y1,x2,y2);
});

document.getElementById('branchangleslider').addEventListener('change', function() {
    branchangle = document.getElementById('branchangleslider').value;
    lineArray = [];
    generateArray(x1,y1,x2,y2);
});


document.getElementById('scaleslider').addEventListener('change', function() {
   magscale = document.getElementById('scaleslider').value;
    lineArray = [];
    generateArray(x1,y1,x2,y2);
});