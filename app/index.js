var jsonfile = require('jsonfile')
var shuffle = require('shuffle-array')
var scan = require('/scan');



const createQueue = require('async').queue;

// Change the concurrency here to run more tests in parallel
const concurrency = process.env.CONCURRENCY;

var urls = shuffle(require('./domains')());

// Create our queue
const queue = createQueue(processUrl, concurrency);
queue.drain = queueDrained;
queue.push(urls); // you could also add them individually

// Process a URL that was passed into the queue
function processUrl (url, done) {
  console.log('Beginning scan of: ' + url);
  var endpoint = process.env.API_GATEWAY_ENDPOINT
  var apiKey = process.env.API_GATEWAY_KEY
  scan(url, endpoint, apiKey, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('Finished scan of ' + url);
      var file = 'results/' + url + '.json'
      var obj = body;

      jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
        console.error(err)
      });
    } else {
      var file = 'results/errors/' + url + '.json'
      var obj = body;

      jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
        console.error(err)
      });
    }

    done();
  });
}

// Called when everything's finished
function queueDrained () {
  console.log('All done!');
}

console.log('Finished scan of ' + urls.length);
