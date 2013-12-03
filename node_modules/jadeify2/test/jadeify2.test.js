/* global describe, it */

var
  transform = require('./transform'),
  fs = require('fs'),
  jadeify = require('../')

require('should')

describe('node-jadeify2', function () {

  it('should compile Jade template', function (done) {
    transform(__dirname + '/simple/example.jade', function (err, output) {
      if (err) done(err)
      var template = require(__dirname + '/simple/example.js')
      template.should.be.a('function')
      template().should.be.a('string')
      template().length.should.be.above(0)
      done()
    })
  })

  it('should compile Jade template that uses the include operator', function (done) {
    transform(__dirname + '/include/example.jade', function (err, output) {
      if (err) done(err)
      var template = require(__dirname + '/include/example.js')
      template.should.be.a('function')
      template().should.be.a('string')
      template().length.should.be.above(0)
      done()
    })
  })

  it('should compile Jade template that uses the extend operator', function (done) {
    transform(__dirname + '/extend/example.jade', function (err, output) {
      if (err) done(err)
      var template = require(__dirname + '/extend/example.js')
      template.should.be.a('function')
      template().should.be.a('string')
      template().length.should.be.above(0)
      done()
    })
  })

  it('should allow custom options to passed through to the jade compiler', function (done) {
    var filename = __dirname + '/include/example.jade'
      , stream = jadeify(filename, { linenos: false, filename: filename  })
      , output = ''
    stream.on('data', function (data) {
      output += data
    })
    stream.on('end', function () {
      output.indexOf('lineno').should.equal(-1)
      done()
    })
    fs.createReadStream(filename).pipe(stream)
  })

})
