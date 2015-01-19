module.exports = function (crypto, exports) {
  exports = exports || {};
  var ciphers = require('./encrypter')(crypto);
  exports.createCipher = exports.Cipher = ciphers.createCipher;
  exports.createCipheriv = exports.Cipheriv = ciphers.createCipheriv;
  var deciphers = require('./decrypter')(crypto);
  exports.createDecipher = exports.Decipher = deciphers.createDecipher;
  exports.createDecipheriv = exports.Decipheriv = deciphers.createDecipheriv;
  var modes = require('./modes');
  function getCiphers () {
    return Object.keys(modes);
  }
  exports.listCiphers = exports.getCiphers = getCiphers;
};
