errorHandler = require '../'
sinon = require 'sinon'
express = require 'express'

describe '#internalError', ->

  it 'renders a 500 page', ->
    errorHandler.internalError new Error("Some blah error"), {}, { send: spy = sinon.spy() }
    spy.args[0][0].should.equal 500
    spy.args[0][1].should.include "Some blah error"

describe '#pageNotFound', ->

  it 'renders a 404 page', ->
    # Fake a Express request object with Accept header set
    req = express.request
    req.headers = Accept: 'text/html'
    errorHandler.pageNotFound req, { send: spy = sinon.spy() }
    spy.args[0][0].should.equal 404
    spy.args[0][1].should.include "The page you were looking for doesn't exist"

describe '#javascriptError', ->

  it 'sends a 500 error reported from a javascript error', (done) ->
    errorHandler.javascriptError {
      body: { stack: 'Yay for stack traces in global error handlers now!' }
    }, {}, (err) ->
      err.toString().should.include 'Yay for stack traces'
      done()
