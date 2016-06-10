var pemtools = require('pemtools');
var asn = require('asn1.js');

var rfc5280 = require('asn1.js/rfc/5280')

var PublicKey = asn.define('PublicKey', function () {
  this.seq().obj(
    
  );
});


exports.toObject = function(data) {
  console.log('CONVERT TO OBJECT');
  console.log(data);
  
  var pem = new pemtools.PEM();
  pem.decode(data);
  
  console.log(pem)
  
  if (pem.tag === 'PUBLIC KEY') {
    //var pk = PublicKey.decode(pem.buf, 'der');
    var pk = rfc5280.SubjectPublicKeyInfo.decode(pem.buf, 'der');
  
    console.log('----');
    console.log(pk)
    //console.log(pk.algorith)
  }
}