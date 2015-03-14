var exec = require('child_process').exec,
    fs = require('fs');

describe('ezel-assets', function() {

  beforeEach(function(done) {
    exec('rm -rf public/assets', function(err) {
      exec('mkdir -p public/assets', function(err) {
        done(err);
      });
    });
  });

  it('generates CSS assets', function(done) {
    exec(
      'node bin/ezel-assets.js',
      function(err, stdout, stderr) {
        fs.readFileSync(process.cwd() + '/public/assets/foo.css').toString()
          .should.equal('h1{color:#00f}body{color:#f00}');
        done();
      }
    )
  });

  it('generates JS assets', function(done) {
    exec(
      'node bin/ezel-assets.js',
      function(err, stdout, stderr) {
        fs.readFileSync(process.cwd() + '/public/assets/bar.js').toString()
          .should.containEql('MODULE_NOT_FOUND');
        done();
      }
    )
  });

  it('generates gzipped assets', function(done) {
    exec(
      'node bin/ezel-assets.js',
      function(err, stdout, stderr) {
        fs.readFileSync(process.cwd() + '/public/assets/bar.js.jgz').toString()
          .length.should.be.above(100);
        done();
      }
    )
  });

});