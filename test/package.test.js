/* global describe, it */

var pkg = require('..');
var expect = require('chai').expect;


describe('pubkeyconv', function() {
  
  it('should export functions', function() {
    expect(pkg.toObject).to.be.a('function');
  });
  
});
