var fileSystem = require('fs');
var path = require('path');

var application_root = path.resolve(__dirname, '../');

module.exports.get = function(request, response) {
  var event = fileSystem.readFileSync(application_root + '/data/evangelists.json', 'utf8');
  response.setHeader('Content-Type', 'application/json');
  response.send(event);
};