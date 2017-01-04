var express = require('express');
var bodyParser = require('body-parser');
var fileSystem = require('fs');
var path = require('path');
var evanglistsController = require('./controllers/evanglistsController');

if (process.argv.length == 2) {
  console.info('Server must be provided with a path to a directory containing an index.html file to be served.');
  console.error('ERROR: Server was not given a static html file to serve.');
  console.info('Please provide a full path to the example-app root directory you wish to run. Do not include the index.html file in the path.');
  return;
};

var staticFilePath = process.argv[2];
var application_root = path.resolve(__dirname, '../');
var port = process.env.PORT || 8000;
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(application_root + '/' + staticFilePath));
app.use('/api', router);

router.use(function(request, response, nextMiddleware) {
  nextMiddleware();
});

router.get('/evangelist', evanglistsController.get);

router.post('/evangelist', function(request, response) {
  //fs.writeFile(__dirname + '/data/evangelists.json', )
});

router.get('/', function(request, response) {
  response.render('index', {});
});

app.listen(port);
console.log('Server hosted from ' + __dirname);
console.log('Server serving static files from ' + application_root + '/' + staticFilePath);
console.log('Server listening on port ' + port);