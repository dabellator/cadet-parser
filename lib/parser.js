var fs = require('fs');
var lodash = require('lodash');

var parser = module.exports = function(path, callback) {
  fs.readFile(path, 'utf-8', function(err, file) {
    file = file.split('\n');
    var weeks = [];
    var days = [];
    var assignments = [];

    var parse = {course: {}};
    parse[1] = function(input) {
      this.course.title = input;
    };
    parse[2] = function(input) {
      weeks.push({order: input});
      this.course.weeks = weeks;
      this.weeksIndex = weeks.length - 1;
    };
    parse[3] = function(input) {
      days.push({order: input});
      this.course.weeks[this.weeksIndex].days = days;
      this.daysIndex = days.length - 1;
    };
    parse[4] = function(input) {
      input = input.split(':');
      assignments.push({type: input[0], description: input[1]});
      this.course.weeks[this.weeksIndex].days[this.daysIndex].assignments = assignments;
      this.assignmentsIndex = assignments.length - 1;
    };
    parse[5] = function(input) {
      this.course.weeks[this.weeksIndex].days[this.daysIndex].assignments[this.assignmentsIndex].rubric = input.split(':')[1];
    };

    for(var i = 0; i < file.length; i++) {

      var hashCount = file[i].lastIndexOf('#') + 1;
      if (hashCount > 0) {
        var inputString = file[i].slice(hashCount);
        parse[hashCount](inputString);
      }
    }
    return callback(err, parse.course);
  });
};

