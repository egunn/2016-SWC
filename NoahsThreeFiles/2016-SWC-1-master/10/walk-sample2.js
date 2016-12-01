var ctx;
var width = 500;
var height = 500;
var clearGradient;
var dot = {theta: 0, x:250, y:250}


var choose = function(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

var clearCanvas = function() {
  ctx.fillStyle= clearGradient;
  ctx.fillRect(0,0,width,height);
}

var wrap = function(someDot) {
  someDot.x = someDot.x >  width ? 0 : someDot.x;
  someDot.x = someDot.x <  0 ? width : someDot.x;
  someDot.y = someDot.y <  0 ? height : someDot.y;
  someDot.y = someDot.y >  height ? 0 : someDot.y;
}

var walk = function (someDot) {
  var direction = choose(['x', 1,2,3,4,5,6, 'left', 'right']);
  var speed = 1;
  switch(direction) {
    case 'left':
      someDot.theta = someDot.theta + 0.1;
      break;
    case 'right':
      someDot.theta = someDot.theta - 0.1;
      break;
  }
  someDot.x = someDot.x + (speed * Math.sin(someDot.theta));
  someDot.y = someDot.y + (speed * Math.cos(someDot.theta));
  wrap(someDot);
};

var draw = function (someDot) {
  var size = 10;
  ctx.fillStyle = 'hsla(0,0%,100%, 0.1)';
  ctx.fillRect(someDot.x, someDot.y, size, size);
}
var update = function() {
  // clearCanvas();
  walk(dot);
  draw(dot);
}

var start = function() {
  var refreshIntervalMs = 1; // 1/1000 of a second
  window.setInterval(update, refreshIntervalMs);

  ctx = document.getElementById("dona").getContext('2d');
  ctx.fillRect(0,0,width,height);
  clearGradient = ctx.createLinearGradient(0,0,width,0);
  clearGradient.addColorStop(0,'hsla(0, 0%, 100%, 0.2');
  clearGradient.addColorStop(1,'hsla(0, 0%, 100%, 0.2');

};

start();
