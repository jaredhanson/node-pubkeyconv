var pemtools = require('pemtools');
var asn = require('asn1.js');

var rfc5280 = require('asn1.js/rfc/5280')

var PublicKey = asn.define('PublicKey', function () {
  this.seq().obj(
    
  );
});

var RSAPublicKey = asn.define('RSAPublicKey', function () {
  this.seq().obj(
    this.key('modulus').int(),
    this.key('publicExponent').int()
  )
})
exports.RSAPublicKey = RSAPublicKey

var ECParameters = asn.define('ECParameters', function() {
  this.choice({
    namedCurve: this.objid()
  })
});

var DSSParms = asn.define('DSSParms', function () {
  this.seq().obj(
    this.key('p').int(),
    this.key('q').int(),
    this.key('g').int()
  )
})



// https://tools.ietf.org/html/rfc5480


exports.toObject = function(data) {
  console.log('CONVERT TO OBJECT');
  console.log(data);
  
  var pem = new pemtools.PEM();
  pem.decode(data);
  
  console.log(pem)
  
  // 1.2.840.10040.4.1  - DSA
  // 1.2.840.10045.2.1  - EC
  
  if (pem.tag === 'PUBLIC KEY') {
    //var pk = PublicKey.decode(pem.buf, 'der');
    var pk = rfc5280.SubjectPublicKeyInfo.decode(pem.buf, 'der');
  
    console.log('----');
    console.log(pk)
    console.log(pk.algorithm.algorithm.join('.'))
    
    switch(pk.algorithm.algorithm.join('.')) {
    case '1.2.840.113549.1.1.1':
      var rsa = RSAPublicKey.decode(pk.subjectPublicKey.data, 'der');
      console.log('RSA!')
      console.log(rsa);
      return { type: 'RSA' }
      break;
      
    case '1.2.840.10045.2.1':
      var rsa = ECParameters.decode(pk.algorithm.parameters, 'der');
      console.log('ECPARAMS')
      console.log(rsa);
      break;
      
    case '1.2.840.10040.4.1':
      // https://tools.ietf.org/html/rfc3279#section-2.3
      // https://github.com/mozilla/browserid-crypto/blob/master/lib/algs/ds.js
      var rsa = DSSParms.decode(pk.algorithm.parameters, 'der');
      console.log('DSSPARMS')
      console.log(rsa);
      
    default:
      
      
      console.log('UNKNOWN = ' + pk.algorithm.algorithm.join('.'));
      
    }
    
    
    
  }
}