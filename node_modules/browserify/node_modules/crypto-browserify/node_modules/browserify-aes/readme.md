browserify-aes
====

[![Build Status](https://travis-ci.org/calvinmetcalf/browserify-aes.svg)](https://travis-ci.org/calvinmetcalf/browserify-aes)

Much of this library has been taken from the aes implementation in [triplesec](https://github.com/keybase/triplesec),  a partial derivation of [crypto-js](https://code.google.com/p/crypto-js/).

`EVP_BytesToKey` is a straight up port of the same function from OpenSSL as there is literally no documenation on it beyond it using 'undocumented extensions' for longer keys.
