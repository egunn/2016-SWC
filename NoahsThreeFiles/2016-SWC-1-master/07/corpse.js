var myCanvas = document.getElementById('corpse');
var drawingPad = myCanvas.getContext('2d');
var studentFunctions = [];

var addStudentFunction = function(username) {
  var scriptUrl = "//" + username + ".github.io/2016-SWC/ps-06/corpse.js";
  jQuery.getScript(scriptUrl, function(script) {
    console.log("Added script for " + username);
    if (window[username] && window[username].drawTop) {
      studentFunctions.push(username);
    }
  });
};

// Read github usernames from roster.json.
// Then load into the document each students corpse.js file.
// expects that each student defined window.githubUsername
var loadCorpses = function() {
  $.getJSON( "../roster.json", function(students) {
    console.dir(students);
    for (var i=0; i < students.length; i++) {
      addStudentFunction(students[i].github);
    }
  });
};

var choose = function() {
  var index = Math.floor(Math.random() * studentFunctions.length);
  var student = studentFunctions[index];
  console.log(student)
  return student;
}


var drawTop = function(ctx) {
  var user=choose();
  window[user].drawTop(ctx);
};

var drawMiddle = function(ctx) {
  var user=choose();
  window[user].drawMiddle(ctx);
};

var drawBottom = function(ctx) {
  var user=choose();
  window[user].drawBottom(ctx);
};

var drawCorpse = function() {
  if (studentFunctions.length > 0) {
    drawingPad.fillStyle = 'white';
    drawingPad.fillRect(0, 0, 400, 720);
    drawTop(drawingPad);
    drawMiddle(drawingPad);
    drawBottom(drawingPad);
  }
};

loadCorpses();

var interval = 1 * 1000;
setInterval(drawCorpse, interval);
