sinon = require 'sinon'
rewire = require 'rewire'
proxyToReflection = rewire '../../../lib/middleware/proxy_to_reflection'

describe 'proxyToReflection', ->
  beforeEach ->
    @req = query: {}
    @res = {}
    @next = sinon.stub()
    @request = sinon.stub()
    @request.returns @request
    @request.head = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request
    proxyToReflection.__set__ 'request', @request
    proxyToReflection.__set__ 'proxy', @proxy = web: sinon.stub()
    proxyToReflection.__set__ 'REFLECTION_URL', 'reflection.url'

  it 'passes through when there is no escaped fragment query param', ->
    @req.query._escaped_fragment_= null
    proxyToReflection @req, @res, @next
    @next.called.should.be.ok()
    
  it 'passes through if reflection fails', ->
    @req.query._escaped_fragment_= null
    err = new Error "Unauthorized"
    err.status = 403
    @request.end.callsArgWith 0, err 
    proxyToReflection @req, @res, @next
    @next.called.should.be.ok()

  context 'with _escaped_fragment_', ->

    paths =
      '/artwork/foo-bar?_escaped_fragment_=': '/artwork/foo-bar'
      '/artwork/foo-bar?a=b&c=d&_escaped_fragment_=': '/artwork/foo-bar%3Fa%3Db%26c%3Dd'
      '/artwork/foo-bar?a=b&c=d%3Ae&_escaped_fragment_=': '/artwork/foo-bar%3Fa%3Db%26c%3Dd%3Ae'

    for source, dest of paths
      it "proxies #{source} to #{dest}", ->
        @req.query._escaped_fragment_= ''
        @request.end.callsArg 0
        proxyToReflection @req, @res, @next
        options = @proxy.web.args[0][2]
        options.target.should.equal 'reflection.url'
