
var pad  = function (number, max) {
  var str = number.toString()
  return str.length < max ? pad("0" + str, max) : str;
}

var updateTime = function() {
  var $millis = $(".millis");  // You can assign a $ jQuery element to a variable...

  var now = new Date();
  var hours = now.getHours() % 12;
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var millis = now.getMilliseconds();

  $(".hour").text(pad(hours,2));
  $(".minute").text(pad(minutes,2));
  $(".second").text(pad(seconds,2));

  $millis.text(pad(millis,3));
}

var pageLoaded = function() {
  var refreshIntervalMs = 100; // 1/1000 of a second
  window.setInterval(updateTime, refreshIntervalMs);
};

$(document).ready(pageLoaded);
