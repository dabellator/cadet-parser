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

    }
    return callback(err, course);
  });
};
