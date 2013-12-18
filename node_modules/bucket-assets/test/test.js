var rewire = require('rewire');
var bucketAssets = rewire('../');
var sinon = require('sinon');

describe('bucketAssets', function() {
  var putFileStub, createClientStub;
  
  beforeEach(function() {
    putFileStub = sinon.stub();
    createClientStub = sinon.stub();
    createClientStub.returns({ putFile: putFileStub });
    bucketAssets.__set__('knox', {
      createClient: createClientStub
    });
    bucketAssets.__set__('exec', function(str, callback) {
      callback(null, 'git-hash');
    });
  });
  
  it('passes on options to knox', function() {
    bucketAssets({
      dir: __dirname + '/assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    createClientStub.args[0][0].key.should.equal('baz');
    createClientStub.args[0][0].bucket.should.equal('flare-production');
    createClientStub.args[0][0].secret.should.equal('foobar');
  });
  
  it('puts files to the s3 bucket', function() {
    bucketAssets({
      dir: __dirname + '/assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putFileStub.args[0][0].should.include('test/assets/app.css');
    putFileStub.args[0][1].should.include('/assets/git-hash/app.css');
    putFileStub.args[1][0].should.include('test/assets/app.js');
    putFileStub.args[1][1].should.include('/assets/git-hash/app.js');
  });
  
  it('adds the proper Content-Type header', function() {
    bucketAssets({
      dir: __dirname + '/assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putFileStub.args[0][2]['Content-Type'].should.equal('text/css');
    putFileStub.args[1][2]['Content-Type'].should.equal('application/javascript');
  });
  
  it('sends gzipped files with Content-Encoding and the underyling Content-Type', function() {
    bucketAssets({
      dir: __dirname + '/assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putFileStub.args[2][2]['Content-Type'].should.equal('application/javascript');
    putFileStub.args[2][2]['Content-Encoding'].should.equal('gzip');
  });
  
});
