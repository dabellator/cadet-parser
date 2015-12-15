var fs = require('fs');
var lodash = require('lodash');

var parser = module.exports = function(path, callback) {
  fs.readFile(path, 'utf-8', function(err, file) {
    file = file.split('\n');
    var course = {};
    for(var i = 0; i < file.length; i++) {
      var char = 0;
      var prefix = [];
      while(file[i][char] === '#') {
        prefix.push(file[i][char]);
        char++;
      }
      switch (true) {

        case (file[i].slice(0, 5) === '#####'):
          this.assignment.rubric =  file[i].split(':')[1].slice(1);
          break;

        case (file[i].slice(0, 4) === '####'):
          this.day['assignment' + assignmentCount] = {};
          this.day['assignment' + assignmentCount].type = file[i].split(':')[0].slice(4);
          this.day['assignment' + assignmentCount].title = file[i].split(':')[1].slice(1);
          this.assignment = this.day['assignment' + assignmentCount];
          assignmentCount++;
          break;

        case (file[i].slice(0, 3) === '###'):
          this.week['day' + file[i].slice(-1)] = {order: file[i].slice(3)};
          this.day = this.week['day' + file[i].slice(-1)];
          assignmentCount = 1;
          break;

        case (file[i].slice(0, 2) === '##'):
          course['week' + file[i].slice(-1)] = {order: file[i].slice(2)};
          this.week = course['week' + file[i].slice(-1)];
          break;

        case (file[i].slice(0, 1) === '#'):
          course.title = file[i].slice(1);
          break;

        default:
          break;
      }
    }
    return callback(err, course);
  });
};
