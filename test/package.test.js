/* global describe, it */

var pkg = require('..');
var expect = require('chai').expect;
var fs = require('fs');


describe('pubkeyconv', function() {
  
  it('should export functions', function() {
    expect(pkg.toObject).to.be.a('function');
  });
  
  it('should convert RSA key to object', function() {
    var data = fs.readFileSync('test/fixtures/rsa.key', { encoding: 'utf8' });
    var key = pkg.toObject(data);
    
    expect(key.type).to.equal('RSA');
    
  });
  
  it('should convert DSA key to object', function() {
    var data = fs.readFileSync('test/fixtures/dsa.key', { encoding: 'utf8' });
    var key = pkg.toObject(data);
    
    //expect(key.type).to.equal('RSA');
    
  });
  
  it.skip('should convert EC key to object', function() {
    var data = fs.readFileSync('test/fixtures/ec.key', { encoding: 'utf8' });
    var key = pkg.toObject(data);
    
    //expect(key.type).to.equal('RSA');
    
  });
  
});
