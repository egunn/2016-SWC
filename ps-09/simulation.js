var ctx = document.getElementById("canvas").getContext('2d');
var height = (getComputedStyle(document.getElementById("canvas")).height).split('p')[0];
var width = getComputedStyle(document.getElementById("canvas")).width.split('p')[0];

var lines = [];
var numLines = 2;
var defaultSpeed = 2;
var maxSpeed = 4;
var minSpeed = 1.5;
var defaultLength = 30;
var maxLength = 60;
var minLength = 20;
var grow = 2;
var margin = {x:10, y:10};
var clearScreen = 0;


var makeLines = function() {
    for (var i = 0; i < numLines; i++) {
        lines.push({
            x: width/2 -10 + (i*20),  //move 10 px from center line
            y: height/2,
            length: defaultLength,
            speed:defaultSpeed,
            direct:{x:-1+(i*2)*Math.random(), y:-1+(i*2)*Math.random(), angle:-1+(i*2)},
            angle: Math.PI
        });
    }
};


makeLines();

var drawLines = function() {
    if(clearScreen < 500){
        ctx.fillStyle = "hsla(0,10%,100%,0.01)";
        ctx.fillRect(0, 0, 500, 500);
        clearScreen++;
    }
    else{
        ctx.fillStyle = "hsla(0,10%,100%,1)";
        ctx.fillRect(0, 0, 500, 500);
        clearScreen = 0;
    }

    ctx.strokeStyle = '';

    lines.forEach(function(d){
        var pointA = {x:d.x+(d.length/2)*Math.sin(d.angle),y:d.y+(d.length/2)*Math.cos(d.angle)};
        var pointB = {x:d.x+(-d.length/2)*Math.sin(d.angle),y:d.y+(-d.length/2)*Math.cos(d.angle)};

        move(d);
        ctx.strokeStyle = "hsla(0,0%,0%,0.1)";
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();
    });

    requestAnimationFrame(drawLines);

};

requestAnimationFrame(drawLines);

var move = function(p) {

    updateSpeed();
    updateLength();

    var center1 = {x:lines[0].x,y:lines[0].y};
    var center2 = {x:lines[1].x,y:lines[1].y};
    var centAngle = Math.atan2((center1.x - center2.x),(center1.y - center2.y));
    var xOffset = 0;
    var yOffset = 0;

    if (width/4 > Math.abs(center1.x - center2.x) || height/4 < Math.abs(center1.y - center2.y) ){
        xOffset = .01*Math.abs(center1.x - center2.x)*Math.sin(centAngle);
        yOffset = .01*Math.abs(center1.y - center2.y)*Math.cos(centAngle);
    }

    if (margin.x < p.x && p.x < width-margin.x){
        p.x = p.x + Math.random()*(p.speed*Math.sign(p.direct.x));
    }
    else if(p.x <= margin.x) {
        p.direct.x = 1;
        p.x = p.x + Math.random()*(p.speed*Math.sign(p.direct.x));
    }
    else if (width-margin.x <= p.x){
        p.direct.x = -1;
        p.x = p.x + Math.random()*(p.speed*Math.sign(p.direct.x));
    }

    if (margin.y < p.y && p.y < height-margin.y){
        p.y = p.y + Math.random()*(p.speed*Math.sign(p.direct.y));
    }
    else if(p.y <= margin.y) {
        p.direct.y = 1;
        p.y = p.y + Math.random()*(p.speed*Math.sign(p.direct.y));
    }
    else if (height-margin.y <= p.y){
        p.direct.y = -1;
        p.y = p.y + Math.random()*(p.speed*Math.sign(p.direct.y));
    }

    p.angle += p.direct.angle*.05;

}

function updateSpeed(){
    var center1 = {x:lines[0].x,y:lines[0].y};
    var center2 = {x:lines[1].x,y:lines[1].y};

    if (width/2 < Math.abs(center1.x - center2.x) || height/2 < Math.abs(center1.y - center2.y) ){
        lines.forEach(function(d){
            if(d.speed > minSpeed){
                d.speed = d.speed*.99;
            }
        })
    }
    else if (width/4 > Math.abs(center1.x - center2.x) || height/4 < Math.abs(center1.y - center2.y) ){
        lines.forEach(function(d){
            if (d.speed < maxSpeed){
                d.speed = d.speed*1.005;
            }
        })
    }

}

function updateLength(){
    var center1 = {x:lines[0].x,y:lines[0].y};
    var center2 = {x:lines[1].x,y:lines[1].y};

    if (3*width/4 < Math.abs(center1.x - center2.x) || 3*height/4 < Math.abs(center1.y - center2.y) ){
        lines.forEach(function(d){
            d.shrink = true;
        })
    }
    else if (width/4 > Math.abs(center1.x - center2.x) || height/4 < Math.abs(center1.y - center2.y) ){
        lines.forEach(function(d){
            d.shrink = false;
        })
    }

    lines.forEach(function(d){
        if (d.shrink == true && d.length > minLength){
            d.length = d.length - grow;
        }
        else if (d.shrink == false && d.length < maxLength ){
            d.length = d.length + grow;
        }
    });


}


