module.exports = function() {
  var request = require('sync-request');
  var fs = require('fs');

  var url = 'https://raw.githubusercontent.com/GSA/data/gh-pages/dotgov-domains/2016-05-02-federal.csv';
  var res = request('GET', url);
  var domainsCsv = res.getBody('utf8');

  var domains = [];
  var lines = domainsCsv.split('\n');

  for (var i = 0; i < lines.length; i++) {
    domains.push(lines[i].toString().split(','));
  }

  var mappedDomains =  domains.map(function(domain) {
    return domain[0].toLowerCase();
  });

  mappedDomains.pop();
  mappedDomains.shift();

  return mappedDomains;
};
