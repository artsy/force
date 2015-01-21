var rewire = require('rewire'),
    bucketAssets = rewire('../'),
    sinon = require('sinon'),
    should = require('should'),
    EventEmitter = require('events').EventEmitter;

describe('bucketAssets', function() {

  var putFileStub, createClientStub, putBufferStub, getFileStub;

  beforeEach(function() {
    putFileStub = sinon.stub();
    putBufferStub = sinon.stub();
    getFileStub = sinon.stub();

    createClientStub = sinon.stub();
    createClientStub.returns({
      putFile: putFileStub,
      putBuffer: putBufferStub,
      getFile: getFileStub
    });
    bucketAssets.__set__('knox', {
      createClient: createClientStub
    });
    bucketAssets.__set__('exec', function(str, callback) {
      callback(null, 'git-hash');
    });
  });

  it('passes on options to knox', function() {
    bucketAssets.upload({
      files: __dirname + '/assets/**/*',
      root: 'assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    createClientStub.args[0][0].key.should.equal('baz');
    createClientStub.args[0][0].bucket.should.equal('flare-production');
    createClientStub.args[0][0].secret.should.equal('foobar');
  });

  it('puts files and non-empty folders to the s3 bucket', function() {
    bucketAssets.upload({
      files: __dirname + '/assets/**/*',
      root: 'assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putBufferStub.args[0][3]();
    putFileStub.args[0][0].should.containEql('test/assets/app.css');
    putFileStub.args[0][1].should.containEql('/app-c1920422.css');
    putFileStub.args[1][0].should.containEql('test/assets/app.js');
    putFileStub.args[1][1].should.containEql('/app-72f6c492.js');
    putFileStub.args[4][0].should.containEql('test/assets/folder_with_file/app.js');
    putFileStub.args[4][1].should.containEql('/folder_with_file/app-72f6c492.js');
  });

  it('adds the proper Content-Type header', function() {
    bucketAssets.upload({
      files: __dirname + '/assets/**/*',
      root: 'assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putBufferStub.args[0][3]();
    putFileStub.args[0][2]['Content-Type'].should.equal('text/css');
    putFileStub.args[1][2]['Content-Type'].should.equal('application/javascript');
  });

  it('adds the proper Max-Age header', function() {
      bucketAssets.upload({
          files: __dirname + '/assets/**/*',
          root: 'assets',
          secret: 'foobar',
          key: 'baz',
          bucket: 'flare-production'
      });
      putBufferStub.args[0][3]();
      putFileStub.args[0][2]['Cache-Control'].should.equal('max-age=315360000, public');
      putFileStub.args[1][2]['Cache-Control'].should.equal('max-age=315360000, public');
  });

  it('sends gzipped files under gz or cgz with Content-Encoding and the underyling Content-Type', function() {
    bucketAssets.upload({
      files: __dirname + '/assets/**/*',
      root: 'assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putBufferStub.args[0][3]();
    putFileStub.args[2][2]['Content-Type'].should.equal('application/javascript');
    putFileStub.args[2][2]['Content-Encoding'].should.equal('gzip');
    putFileStub.args[3][2]['Content-Type'].should.equal('application/javascript');
    putFileStub.args[3][2]['Content-Encoding'].should.equal('gzip');
  });

  it('uploads a manifest of fingerprinted files', function() {
    bucketAssets.upload({
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    var manifest = JSON.parse(putBufferStub.args[0][0]);
    manifest['/bar.js'].should.equal('/bar-9b57f0be.js');
    manifest['/foo.js'].should.equal('/foo-190774dc.js');
    manifest['/baz.js'].should.equal('/baz-842ebc9d.js');
  });

  it('uploads a manifest of fingerprinted files retaining sub-folders', function() {
    bucketAssets.upload({
      files: __dirname + '/assets/**/*',
      root: 'assets',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    var manifest = JSON.parse(putBufferStub.args[0][0]);
    manifest['/folder_with_file/app.js'].should.equal('/folder_with_file/app-72f6c492.js');
  });

  it('can join files from all sorts of public' +
     ' folders except in node_modules', function() {
    bucketAssets.upload({
      files: __dirname + '/app/**/public/**',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putBufferStub.args[0][3]();
    putFileStub.args[0][1].should.equal('/bar-9b57f0be.js');
    putFileStub.args[1][1].should.equal('/icons/check.svg');
    putFileStub.args[2][1].should.equal('/foo-190774dc.js');
    putFileStub.args[3][1].should.equal('/baz-842ebc9d.js');
  });

  it('uploads proper svg mime type', function() {
    bucketAssets.upload({
      files: __dirname + '/app/**/public/**/*.svg',
      secret: 'foobar',
      key: 'baz',
      bucket: 'flare-production'
    });
    putBufferStub.args[0][3]();
    putFileStub.args[0][2]['Content-Type'].should.equal('image/svg+xml');
  });

  context('middleware', function() {

    var req, res, next;

    beforeEach(function() {
      req = {};
      res = { locals: {} };
      next = sinon.stub();
    });

    it('noops for dev', function() {
      bucketAssets()(req, res, next);
      res.locals.asset('/foo.js').should.equal('/foo.js');
      next.called.should.be.ok;
    });

    it('fetches the manifest and when finished provides a ' +
       'fingerprinting view helper', function() {
      bucketAssets.__set__('NODE_ENV', 'production');
      bucketAssets({ cdnUrl: 'http://cdn.com' })(req, res, next);
      var emitter = new EventEmitter();
      next.called.should.not.be.ok
      getFileStub.args[0][1](null, emitter);
      emitter.emit('data', JSON.stringify({ '/foo.js': '/foo-123.js' }));
      emitter.emit('end');
      next.called.should.be.ok
      res.locals.asset('/foo.js').should.equal('http://cdn.com/foo-123.js');
    });

    it('catches S3 errors', function() {
      bucketAssets.__set__('NODE_ENV', 'production');
      bucketAssets({ cdnUrl: 'http://cdn.com' })(req, res, next);
      var emitter = new EventEmitter();
      getFileStub.args[0][1](null, emitter);
      emitter.emit('data', "<error>Thanks for the XML!</error>");
      emitter.emit('end');
      next.args[0][0].toString()
        .should.equal('SyntaxError: Unexpected token <');
    });

    it('tries to find the manifest by git hash', function() {
      bucketAssets.__set__('NODE_ENV', 'production');
      bucketAssets(req, res, next);
      getFileStub.args[0][0].should.equal('/manifest-git-hash.json');
    });

    it('first tries to find the manifest by a COMMIT_HASH env var', function() {
      bucketAssets.__set__('NODE_ENV', 'production');
      bucketAssets.__set__('COMMIT_HASH', 'mashy-hasie');
      bucketAssets(req, res, next);
      getFileStub.args[0][0].should.equal('/manifest-mashy-hasie.json');
    });
  });
});
