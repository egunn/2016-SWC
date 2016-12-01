var addSolution = function (student, problemset) {
  var name = student.name
  var webpage = "http://" + student.github + ".github.io/2016-SWC/" + problemset
  var github = "http://github.com/" + student.github
  var tag = "<li><a href='" + webpage + "' target='_blank'>" + name + "</a></li>";
  $('#solutions').append($(tag));
};

window.solutions = function(problemset) {
  $.getJSON( "../roster.json", function(students) {
    $('#dynamic-content').append($("<ul className='solutions' id='solutions'>"));
    for (var student of students) {
      addSolution(student, problemset);
    }
  });
};
