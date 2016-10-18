var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');

//use only letters approved for eye exam chart, based on visual weighting
var alphabetArray = ['C', 'D', 'E', 'F', 'H', 'K', 'N', 'P', 'R', 'U', 'V', 'Z'];
var letter;
var fontSize = 36;
linePlacement = 80;
var fontSpace = 1;
var fontOffset = .2;
var numLett = 1;
var centerLett = 0;
var numLines = 5;

for (var j = 0; j < numLines; j++){
    for (var i=0; i<numLett; i++){
        letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
        drawingPad.font= fontSize + "px Arial";
        drawingPad.textAlign="center";
        drawingPad.fillText(letter, width/2+(i-centerLett)*fontSize*fontSpace,linePlacement);
    }

    linePlacement = linePlacement + 55;//fontSize + 30 ;
    fontSize = fontSize - 10;
    fontSpace = fontSpace + fontOffset;
    fontOffset += .1;
    numLett += 2;
    centerLett ++;
}

