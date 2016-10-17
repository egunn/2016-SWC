var canvas = document.getElementById('canvas');

var width = canvas.width;
var height = canvas.height;
var drawingPad = canvas.getContext('2d');

var alphabetArray = ['C', 'D', 'E', 'F', 'H', 'K', 'N', 'P', 'R', 'U', 'V', 'Z'];
var letter;
var fontSize = 36;
linePlacement = 80;
var fontSpace = 1;

//line 1
letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
drawingPad.font= fontSize + "px Arial";
drawingPad.textAlign="center";
drawingPad.fillText(letter,width/2+(0*fontSize),linePlacement);

linePlacement = linePlacement + 55;//fontSize + 20;
fontSize = fontSize - 10;
fontSpace = fontSpace + .2;

//line 2
for (var i=0; i<3; i++){
    letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
    drawingPad.font= fontSize + "px Arial";
    drawingPad.textAlign="center";
    drawingPad.fillText(letter, width/2+(i-1)*fontSize*fontSpace,linePlacement);
}

linePlacement = linePlacement + 55;//fontSize + 30 ;
fontSize = fontSize - 10;
fontSpace = fontSpace + .3;

//line 3
for (var i=0; i<5; i++){
    letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
    drawingPad.font= fontSize + "px Arial";
    drawingPad.textAlign="center";
    drawingPad.fillText(letter, width/2+(i-2)*fontSize*fontSpace ,linePlacement);
}

linePlacement = linePlacement + 55;//fontSize + 40 ;
fontSize = fontSize - 10;
fontSpace = fontSpace + .4;

//line 3
for (var i=0; i<7; i++){
    letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
    drawingPad.font= fontSize + "px Arial";
    drawingPad.textAlign="center";
    drawingPad.fillText(letter, width/2+(i-3)*fontSize*fontSpace ,linePlacement);
}

linePlacement = linePlacement + 55;// fontSize + 50 ;
fontSize = fontSize - 10;
fontSpace = fontSpace + .5;

//line 3
for (var i=0; i<9; i++){
    letter = alphabetArray[Math.floor(Math.random()*alphabetArray.length)];
    drawingPad.font= fontSize + "px Arial";
    drawingPad.textAlign="center";
    drawingPad.fillText(letter, width/2+(i-4)*fontSize*fontSpace ,linePlacement);
}
