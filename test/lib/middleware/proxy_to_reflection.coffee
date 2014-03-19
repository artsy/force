_                   = require 'underscore'
sinon               = require 'sinon'
rewire              = require 'rewire'
{ REFLECTION_URL }  = require '../../../config'
proxyToReflection   = rewire '../../../lib/middleware/proxy_to_reflection'

endStub   = sinon.stub()
getStub   = sinon.stub()
proxyToReflection.__set__ 'request',
  get: (url) ->
    getStub url
    end: endStub

describe 'proxyToReflection', ->
  beforeEach ->
    @req    = url: '/artwork/foo-bar', query: {}
    @res    = {}
    @next   = sinon.stub()

  it 'passes through when there is no escaped fragment query param', ->
    proxyToReflection @req, @res, @next
    @next.called.should.be.ok

  describe 'with _escaped_fragment_', ->
    beforeEach ->
      @req.query._escaped_fragment_ = 'existy'

    it 'intercepts the request and redirects if the escaped fargment query param is present', ->
      proxyToReflection @req, @res, @next
      getStub.args[0][0].should.equal "#{REFLECTION_URL}/artwork/foo-bar"
      endStub.called.should.be.ok
