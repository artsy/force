var test = require('tape');
var fs = require('fs');
var priv1024 = fs.readFileSync(__dirname + '/rsa.1024.priv');
var rsa1024 = {
	private: fs.readFileSync(__dirname + '/rsa.1024.priv'),
	public: fs.readFileSync(__dirname + '/rsa.1024.pub')
};
var rsa2028 = {
	private: fs.readFileSync(__dirname + '/rsa.2028.priv'),
	public: fs.readFileSync(__dirname + '/rsa.2028.pub')
};
var nonrsa1024 = {
	private: fs.readFileSync(__dirname + '/1024.priv'),
	public: fs.readFileSync(__dirname + '/1024.pub')
};
var pass1024 = {
	private: {
		passphrase: 'fooo',
		key:fs.readFileSync(__dirname + '/pass.1024.priv')
	},
	public: fs.readFileSync(__dirname + '/pass.1024.pub')
};
var ec = {
	private: fs.readFileSync(__dirname + '/ec.priv'),
	public: fs.readFileSync(__dirname + '/ec.pub')
};
var ecpass = {
	private: {
		key: fs.readFileSync(__dirname + '/ec.pass.priv'),
		passphrase: 'bard'
	},
	public: fs.readFileSync(__dirname + '/ec.pub')
};
var dsa = {
	private: fs.readFileSync(__dirname + '/dsa.1024.priv'),
	public: fs.readFileSync(__dirname + '/dsa.1024.pub')
};
var dsa2 = {
	private: fs.readFileSync(__dirname + '/dsa.2048.priv'),
	public: fs.readFileSync(__dirname + '/dsa.2048.pub')
};
var dsapass = {
	private: {
		key:fs.readFileSync(__dirname + '/pass.dsa.1024.priv'),
		passphrase:'password'
	},
	public: fs.readFileSync(__dirname + '/pass.dsa.1024.pub')
};
var dsapass2 = {
	private: {
		key:fs.readFileSync(__dirname + '/pass2.dsa.1024.priv'),
		passphrase:'password'
	},
	public: fs.readFileSync(__dirname + '/pass2.dsa.1024.pub')
};
var rsapass = {
	private: {
		key:fs.readFileSync(__dirname + '/pass.rsa.1024.priv'),
		passphrase:'password'
	},
	public: fs.readFileSync(__dirname + '/pass.rsa.1024.pub')
};
var rsapass2 = {
	private: {
		key:fs.readFileSync(__dirname + '/pass.rsa.2028.priv'),
		passphrase:'password'
	},
	public: fs.readFileSync(__dirname + '/pass.rsa.2028.pub')
};
function isNode10() {
  return process.version && process.version.split('.').length === 3 && parseInt(process.version.split('.')[1], 10) <= 10;
}
var nodeCrypto = require('crypto');
var myCrypto = require('../');
function testIt(keys, message, scheme) {
	var pub = keys.public;
	var priv = keys.private;
	test(message.toString(), function (t) {
		t.plan(4);
		var mySign = myCrypto.createSign(scheme);
		var nodeSign = nodeCrypto.createSign(scheme);
		var mySig = mySign.update(message).sign(priv);
		var nodeSig = nodeSign.update(message).sign(priv);
		t.equals(mySig.length, nodeSig.length, 'correct length');
		t.equals(mySig.toString('hex'), nodeSig.toString('hex'), 'equal sigs');
		var myVer = myCrypto.createVerify(scheme);
		var nodeVer = nodeCrypto.createVerify(scheme);
		t.ok(nodeVer.update(message).verify(pub, mySig), 'node validate my sig');
		t.ok(myVer.update(message).verify(pub, nodeSig), 'me validate node sig');
	});
}
function ectestIt(keys, message, scheme) {
	var pub = keys.public;
	var priv = keys.private;
	test(message.toString(), function (t) {
		t.plan(3);
		
		var nodeSign = nodeCrypto.createSign(scheme);
		var mySign = myCrypto.createSign(scheme);
		var mySig = mySign.update(message).sign(priv);
		var nodeSig = nodeSign.update(message).sign(priv);
		t.notEqual(mySig.toString('hex'), nodeSig.toString('hex'), 'not equal sigs');
		var myVer = myCrypto.createVerify(scheme);
		var nodeVer = nodeCrypto.createVerify(scheme);
		t.ok(nodeVer.update(message).verify(pub, mySig), 'node validate my sig');
		t.ok(myVer.update(message).verify(pub, nodeSig), 'me validate node sig');
	});
}
ectestIt(dsa, new Buffer('dsa with 1024 keys'), 'DSA');
ectestIt(dsa2, new Buffer('dsa with 2048 keys'), 'DSA-SHA1');
testIt(rsa1024, new Buffer('md5 with 1024 keys'), 'RSA-MD5');
ectestIt(ec, new Buffer('ecdsa with sha1'), 'ecdsa-with-SHA1');
testIt(rsa1024, new Buffer('md5 with 1024 keys'), 'RSA-MD5');
testIt(rsa2028, new Buffer('md5 with 2028 keys'), 'RSA-MD5');
testIt(nonrsa1024, new Buffer('md5 with 1024 keys non-rsa key'), 'RSA-MD5');
testIt(rsa1024, new Buffer('rmd160 with 2028 keys'), 'RSA-RIPEMD160');
testIt(rsa2028, new Buffer('rmd160 with 1024 keys'), 'RSA-RIPEMD160');
testIt(nonrsa1024, new Buffer('rmd160 with 1024 keys non-rsa key'), 'RSA-RIPEMD160');
testIt(rsa1024, new Buffer('sha1 with 1024 keys'), 'RSA-SHA1');
testIt(rsa2028, new Buffer('sha1 with 2028 keys'), 'RSA-SHA1');
testIt(nonrsa1024, new Buffer('sha1 with 1024 keys non-rsa key'), 'RSA-SHA1');
testIt(rsa1024, new Buffer('sha224 with 1024 keys'), 'RSA-SHA224');
testIt(nonrsa1024, new Buffer('sha224 with 1024 keys non-rsa key'), 'RSA-SHA224');
testIt(rsa2028, new Buffer('sha224 with 2028 keys'), 'RSA-SHA224');
testIt(rsa1024, new Buffer('SHA256 with 1024 keys'), 'RSA-SHA256');
testIt(nonrsa1024, new Buffer('sha256 with 1024 keys non-rsa key'), 'RSA-SHA256');
testIt(rsa2028, new Buffer('SHA256 with 2028 keys'), 'RSA-SHA256');
testIt(rsa1024, new Buffer('SHA384 with 1024 keys'), 'RSA-SHA384');
testIt(nonrsa1024, new Buffer('sha384 with 1024 keys non-rsa key'), 'RSA-SHA384');
testIt(rsa2028, new Buffer('SHA384 with 2028 keys'), 'RSA-SHA384');
testIt(rsa1024, new Buffer('SHA512 with 1024 keys'), 'RSA-SHA512');
testIt(nonrsa1024, new Buffer('sha512 with 1024 keys non-rsa key'), 'RSA-SHA512');
testIt(rsa2028, new Buffer('SHA512 with 2028 keys'), 'RSA-SHA512');
if (!isNode10()) {
	ectestIt(ecpass, new Buffer('ecdsa with password'), 'ecdsa-with-SHA1');
	ectestIt(dsapass, new Buffer('dsa with 1024 keys and a password'), 'DSA-SHA');
	ectestIt(dsapass2, new Buffer('dsa with 1024 keys and a password varient'), 'DSA-SHA');
	testIt(rsapass, new Buffer('sha1 with 1024 keys and password, varient'), 'RSA-SHA1');
	testIt(rsapass2, new Buffer('sha1 with 2024 keys and password, varient'), 'RSA-SHA1');
	testIt(rsapass, new Buffer('sha224 with 1024 keys and password, varient'), 'RSA-SHA224');
	testIt(rsapass2, new Buffer('sha224 with 2024 keys and password, varient'), 'RSA-SHA224');
	testIt(rsapass, new Buffer('sha256 with 1024 keys and password, varient'), 'RSA-SHA256');
	testIt(rsapass2, new Buffer('sha256 with 2024 keys and password, varient'), 'RSA-SHA256');
	testIt(rsapass, new Buffer('sha384 with 1024 keys and password, varient'), 'RSA-SHA384');
	testIt(rsapass2, new Buffer('sha384 with 2024 keys and password, varient'), 'RSA-SHA384');
	testIt(rsapass, new Buffer('sha512 with 1024 keys and password, varient'), 'RSA-SHA512');
	testIt(rsapass2, new Buffer('sha512 with 2024 keys and password, varient'), 'RSA-SHA512');
	testIt(rsapass, new Buffer('rmd160 with 1024 keys and password, varient'), 'RSA-RIPEMD160');
	testIt(rsapass2, new Buffer('rmd160 with 2024 keys and password, varient'), 'RSA-RIPEMD160');
	testIt(rsapass, new Buffer('md5 with 1024 keys and password, varient'), 'RSA-MD5');
	testIt(rsapass2, new Buffer('md5 with 2024 keys and password, varient'), 'RSA-MD5');
	testIt(pass1024, new Buffer('sha1 with 1024 keys and password'), 'RSA-SHA1');
	testIt(pass1024, new Buffer('sha224 with 1024 keys and password'), 'RSA-SHA224');
	testIt(pass1024, new Buffer('sha256 with 1024 keys and password'), 'RSA-SHA256');
	testIt(pass1024, new Buffer('sha384 with 1024 keys and password'), 'RSA-SHA384');
	testIt(pass1024, new Buffer('sha512 with 1024 keys and password'), 'RSA-SHA512');
	testIt(pass1024, new Buffer('rmd160 with 1024 keys and password'), 'RSA-RIPEMD160');
	testIt(pass1024, new Buffer('md5 with 1024 keys and password'), 'RSA-MD5');
}