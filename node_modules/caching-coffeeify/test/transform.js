var test      =  require('tap').test;
var fs        =  require('fs');
var path      =  require('path');
var through   =  require('through');
var convert   =  require('convert-source-map');
var coffee    =  require('coffee-script');
var transform =  require('..');

test('transform adds sourcemap comment and uses cache on second time', function (t) {
    t.plan(2);
    var data = '';
    var compiles = 0;
    var originalCompile = coffee.compile;

    coffee.compile = function () {
      compiles++;
      var args = [].slice.call(arguments);
      return originalCompile.apply(this, args);
    };

    var file = path.join(__dirname, '../example/foo.coffee');
    // first time
    fs.createReadStream(file)
        .pipe(transform(file))
        .pipe(through(write));

    // second time
    fs.createReadStream(file)
        .pipe(transform(file))
        .pipe(through(write, end));

    function write (buf) { data += buf; }
    function end () {
        var sourceMap = convert.fromSource(data).toObject();

        t.deepEqual(
            sourceMap,
            { version: 3,
              file: file,
              sourceRoot: '',
              sources: [ file ],
              names: [],
              mappings: 'AAAA,CAAQ,EAAR,IAAO,GAAK',
              sourcesContent: [ 'console.log(require \'./bar.js\')\n' ] },
            'adds sourcemap comment including original source'
      );
      t.equal(compiles, 1, 'compiles only the first time');
    }
});
