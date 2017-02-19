rewire = require 'rewire'
sinon = require 'sinon'
hsts = rewire '../../../lib/middleware/hsts'

describe 'HTTP strict transport security middleware', ->

  beforeEach ->
    @req = { }
    @res = { headers: [], set: (name, value) -> @headers[name] = value }
    @next = sinon.stub()

  it 'adds Strict-Transport-Security header', ->
    hsts.__set__ 'APP_URL', 'https://foobart.sy'
    @req.get = -> 'https'
    hsts @req, @res, @next
    @res.headers['Strict-Transport-Security'].should.equal 'max-age=31536000'
