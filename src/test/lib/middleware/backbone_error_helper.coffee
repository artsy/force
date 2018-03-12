rewire = require 'rewire'
sinon = require 'sinon'
express = require 'express'
jade = require 'jade'
fs = require 'fs'
backboneErrorHelper = rewire '../../../lib/middleware/backbone_error_helper'

describe 'Backbone error', ->

  beforeEach ->
    @req = {}
    @res = { status: sinon.stub() }
    @next = sinon.stub()
    backboneErrorHelper @req, @res, @next

  it 'adds a backbone error handler helper', ->
    @res.backboneError {}, { text: '{"error":"Foo Err"}' }
    @next.args[1][0].toString().should.containEql 'Foo Err'

  it 'handles generic stringy errors', ->
    @res.backboneError {}, { text: 'Foo Err' }
    @next.args[1][0].toString().should.containEql 'Foo Err'

  it 'turns 403 errors into 404s', ->
    @res.backboneError {}, { status: 403 }
    @next.args[1][0].toString().should.containEql 'Not Found'

  it 'attaches API status to the errors', ->
    @res.backboneError {}, { status: 404 }
    @next.args[1][0].status.should.equal 404

  it 'tries stack if its not an HTTP error', ->
    @res.backboneError {}, { stack: 'foo' }
    @next.args[1][0].message.should.equal 'foo'
    @next.args[1][0].status.should.equal 500

  it 'tries message if its not an HTTP error', ->
    @res.backboneError {}, { message: 'foo' }
    @next.args[1][0].message.should.equal 'foo'
    @next.args[1][0].status.should.equal 500

  it 'will even try stringifying before unknown', ->
    @res.backboneError {}, { foo: 'bar' }
    @next.args[1][0].message.should.equal '{"foo":"bar"}'
    @next.args[1][0].status.should.equal 500
