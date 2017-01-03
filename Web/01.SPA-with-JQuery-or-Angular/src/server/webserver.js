var express = require('express');
var bodyParser = require('body-parser');
var fileSystem = require('fs');
var path = require('path');

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(application_root + '/' + staticFilePath));
app.use('/api', router);

router.use(function(request, response, nextMiddleware) {
  nextMiddleware();
});

router.get('/evangelist', function(request, response) {
  var event = fileSystem.readFileSync(__dirname + '/data/evangelists.json', 'utf8');
  response.setHeader('Content-Type', 'application/json');
  response.send(event);
});

router.post('/evangelist', function(request, response) {
  //fs.writeFile(__dirname + '/data/evangelists.json', )
});

router.get('/', function(request, response) {
  response.render('index', {});
});

app.listen(port);
console.log('Server hosted from ' + __dirname);
console.log('Server serving static files from ' + application_root + '/' + staticFilePath);
console.log('Server listening on port 8000');

/*
var express = require('express');
var path = require('path');
var events = require('./controllers/evangelistController');
var bodyParser = require('body-parser');

var app = express();
var rootPath = path.normalize(__dirname + '/../');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + 'app'));
app.get('/api/data/event/', events.get);
app.post('/api/data/event/', events.save);

app.listen(8000);
console.log('Server listening on port 8000');
*/
