var expect = require('chai').expect;
var _ = require('lodash');

describe('domains', function() {
  // TODO: stop making a network call in the test
  var domains = require('.././domains')();

  it('should return an Array of domains', function() {
    stubSyncRequest();

    expect( domains ).to.be.a('array');

    var types = domains.map(function(domain) {
      return typeof domain;
    });

    expect( _.uniq(types)[0] ).to.be.a('string')
  });
});
