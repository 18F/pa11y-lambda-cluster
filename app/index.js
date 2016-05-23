"use strict"

var request = require('request');
var jsonfile = require('jsonfile')
var DotgovListFetcher = require('dotgov-list');


var scan = function(url, callback) {
  var options = {
    uri: process.env.API_GATEWAY_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_GATEWAY_KEY
    },
    json: true,
    body: {
      url: url,
      pa11yOptions: {
        standard: 'WCAG2AA',
        wait: 500,
      }
    }
  };

  var responseHandler = function(error, response, body) {
    callback(error, response, body);
  };

  request.post(options, responseHandler);
};

const createQueue = require('async').queue;

// Change the concurrency here to run more tests in parallel
const concurrency = process.env.CONCURRENCY;


// Create our queue
const queue = createQueue(processUrl, concurrency);
queue.drain = queueDrained;

console.log(typeof DotgovListFetcher);
console.log(DotgovListFetcher);

var fetcher = new DotgovListFetcher('2016-05-02-federal.csv');
fetcher.perform(function(error, list) {
  var urls = list.map(function(listItem) {
    return listItem['domainName'].toLowerCase();
  });
  queue.push(urls);
});


// Process a URL that was passed into the queue
function processUrl(url, done) {
  console.log('Beginning scan of: ' + url);
  scan(url, function(error, response, body) {
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
