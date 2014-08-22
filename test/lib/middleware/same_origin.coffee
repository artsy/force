rewire = require 'rewire'
sinon = require 'sinon'
sameOrign = rewire '../../../lib/middleware/same_origin'

describe 'Same origin middleware', ->

  beforeEach ->
    @req = { }
    @res = { headers: {} }

  it 'adds x-frame-options header', ->
    @req.get = -> 'http:'
    sameOrign @req, @res
    @res.headers['X-Frame-Options'].should.equal 'SAMEORIGIN'

  it 'doesnt error if headers are not defined', ->
    @res.headers = undefined
    @req.get = -> 'http:'
    sameOrign @req, @res
    @res.should.be.ok
