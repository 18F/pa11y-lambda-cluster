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
        ignore: ['notice', 'warning']
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

 (typeof DotgovListFetcher);
 (DotgovListFetcher);

var fetcher = new DotgovListFetcher(process.env.DOMAIN_LIST);
fetcher.perform(function(error, list) {
  var urls = list.map(function(listItem) {
    return listItem['domainName'].toLowerCase();
  });
  queue.push(urls);
});

function pa11yOutputIsValid(obj) {
  if (Array.isArray(obj)) {

    if (obj.length > 0) {
      var firstElement = obj[0];

      if (firstElement.hasOwnProperty('code')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }


  } else {
    return false
  }
}

// Process a URL that was passed into the queue
function processUrl(url, done) {
   ('Beginning scan of: ' + url);
  scan(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
       ('Finished scan of ' + url);


      if (pa11yOutputIsValid(body)) {
        var file = 'results/' + url + '.json'

        jsonfile.writeFile(file, body, {spaces: 2}, function(err) {
          console.error(err)
        });
      } else {
        var file = 'results/errors/' + url + '.json'

        jsonfile.writeFile(file, body, {spaces: 2}, function(err) {
          console.error(err)
        });
      }

    } else {
      var file = 'results/errors/' + url + '.json'

      jsonfile.writeFile(file, body, {spaces: 2}, function(err) {
        console.error(err)
      });
    }

    done();
  });
}

// Called when everything's finished
function queueDrained () {
   ('All done!');
}
