//sample random walker from last week

var ctx = document.getElementById("canvas").getContext('2d');

var point = {x:150,y:150};

var clearScreen = function() {
    ctx.fillStyle = "hsla(0,10%,100%,0.2)";
    ctx.fillRect(0,0,500,500);
};

function wrap(point){
    if(point.x > 500) {
        point.x = 0;
        point.y = point.y + 11;
    }
    if (point.y > 500) {
        point.y = 0;
    }
}

function move(p){
    var speed = 2;
    var direction = Math.random();

    if (direction < 0.25){  // up
        p.y += p.speed;
    }
    else if (direction < 0.50) {  //down
        p.y -= p.speed;
    }
    else if (direction < .9){  //left
        p.x -= p.speed;
    }
    else {
        p.x = p.x + p.speed;  //right
    }

}

var makeColor = function(hue, sat,light, alph){
    return "hsla(" + hue + ',' + sat + '%,' + light + '%,' +  alph + ')';
}
var drawPoints = function () {
    clearScreen();
    var size = 10;

    ctx.strokeStyle = '';

    //points.forEach(function(d){
    for (var i = 0; i < points.length; i++){
        var point = points[i];
        var hue = point.y/3 + 200;
        var alpha = point.size;
        move(point);
        wrap(point);
        ctx.fillStyle = makeColor(hue,50,50,1);
        ctx.fillRect(point.x, point.y, point.size, point.size);
    };

    requestAnimationFrame(drawPoints)
};

var points = [];
var numPoints = 50;

var makePoints = function() {
    for (var i = 0; i < numPoints; i++){
        var size = Math.random()*15;
        var speed = 1 - size;
        points.push({x:Math.random()*500, y:150, size: size, speed:speed});
    }
}


makePoints();

requestAnimationFrame(drawPoints);
