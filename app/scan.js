var request = require('request');

var scan = function(url, endpoint, apiKey, callback) {
  var options = {
    uri: endpoint,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
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

module.exports = scan;
