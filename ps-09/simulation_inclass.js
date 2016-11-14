var ctx = document.getElementById("canvas").getContext('2d');
var height = 500;
var width = 500;
var points = [];
var numPoints = 5;

var clearScreen = function() {
    ctx.fillStyle = "hsla(0,10%,100%,0.0001)";
    ctx.fillRect(0, 0, 500, 500);
};

var wrap = function(point) {
    if (point.x > width) {
        point.x = 0;
        point.y = point.y + 11;
    }
    if (point.y > height) {
        point.y = 0;
    }
    if (point.y < 0) {
        point.y = height;
    }

};

var move = function(p) {
    var speed = p.speed;
    var direction = Math.random();
    if (direction < 0.70) { // move up
        p.y = p.y - speed;
    } else if (direction < 0.80) {
        p.x = p.x - speed;
    } else if (direction < 0.90) {
        p.y = p.y + speed;
    } else {
        p.x = p.x + speed;
    }
}


var drawPoints = function() {
    clearScreen();

    ctx.strokeStyle = '';

    for (var i = 1; i < points.length; i++) {
        var pointA = points[i-1]
        var pointB = points[i];
        move(pointA);
        wrap(pointA);
        ctx.strokeStyle = "hsla(0,0%,0%,0.1)";
        ctx.beginPath();
        ctx.moveTo(pointA.x, pointA.y);

        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();
    }
    requestAnimationFrame(drawPoints);
};

var makePoints = function() {
    for (var i = 0; i < numPoints; i++) {
        var size = Math.random() * 15;
        var x = Math.random() * width;
        var speed = 10 - size;
        points.push({
            x: x,
            y: 250,
            size: size,
            speed: speed
        });
    }
};

makePoints();
requestAnimationFrame(drawPoints);

/*
 var ctx = document.getElementById("walk").getContext('2d');
 var height = 500;
 var width = 500;
 var points = [];
 var numPoints = 50;

 var clearScreen = function() {
 ctx.fillStyle = "hsla(0,10%,100%,0.0001)";
 ctx.fillRect(0, 0, 500, 500);
 };

 var wrap = function(point) {
 if (point.x > width) {
 point.x = 0;
 point.y = point.y + 11;
 }
 if (point.y > height) {
 point.y = 0;
 }
 if (point.y < 0) {
 point.y = height;
 }

 };

 var move = function(p) {
 var speed = p.speed;
 var direction = Math.random();
 if (direction < 0.70) { // move up
 p.y = p.y - speed;
 } else if (direction < 0.80) {
 p.x = p.x - speed;
 } else if (direction < 0.90) {
 p.y = p.y + speed;
 } else {
 p.x = p.x + speed;
 }
 }

 var makeColor = function(hue, sat, light, alph) {
 return "hsla(" + hue + "," + sat + "%," + light + "%," + alph + ")";
 };
 var drawPoints = function() {
 clearScreen();

 ctx.strokeStyle = '';

 for (var i = 1; i < points.length; i++) {
 var pointA = points[i-1]
 var pointB = points[i];
 var lightness = pointA.y / 50;
 move(pointA);
 wrap(pointA);

 ctx.strokeStyle = makeColor(0,0,lightness,0.1);
 ctx.beginPath();
 ctx.moveTo(pointA.x, pointA.y);

 ctx.lineTo(pointB.x, pointB.y);
 ctx.stroke();
 }
 requestAnimationFrame(drawPoints);
 };

 var makePoints = function() {
 var x = 20;
 for (var i = 0; i < numPoints; i++) {
 var size = Math.random() * 15;
 var x = x + 20;
 var speed = 1;
 points.push({
 x: x,
 y: 250,
 size: size,
 speed: speed
 });
 }
 };

 makePoints();
 requestAnimationFrame(drawPoints);
 */