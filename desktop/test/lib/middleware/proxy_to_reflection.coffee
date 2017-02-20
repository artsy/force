_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
{ REFLECTION_URL } = require '../../../config'
proxyToReflection = rewire '../../../lib/middleware/proxy_to_reflection'
{ parse } = require 'url'
querystring = require 'querystring'

endStub = sinon.stub()
getStub = sinon.stub()
proxyToReflection.__set__ 'request',
  get: (url) ->
    getStub url
    end: endStub

describe 'proxyToReflection', ->
  beforeEach ->
    @res = {}
    @next = sinon.stub()

  it 'passes through when there is no escaped fragment query param', ->
    req = url: '/artwork/foo-bar', query: {}
    proxyToReflection req, @res, @next
    @next.called.should.be.ok()

  context 'with _escaped_fragment_', ->

    paths =
      '/artwork/foo-bar?_escaped_fragment_=': '/artwork/foo-bar'
      '/artwork/foo-bar?a=b&c=d&_escaped_fragment_=': '/artwork/foo-bar%3Fa%3Db%26c%3Dd'
      '/artwork/foo-bar?a=b&c=d%3Ae&_escaped_fragment_=': '/artwork/foo-bar%3Fa%3Db%26c%3Dd%3Ae'

    it 'passes through when relfection returns a 403', ->
      parsed = parse(source)
      req = url: parsed.path, query: querystring.parse(parsed.query)
      proxyToReflection req, @res, @next
      endStub.args[0][0] null, status: 403
      @next.called.should.be.ok()

    for source, dest of paths
      it "proxies #{source} to #{dest}", ->
        parsed = parse(source)
        req = url: parsed.path, query: querystring.parse(parsed.query)
        proxyToReflection req, @res, @next
        getStub.args[0][0].should.equal "#{REFLECTION_URL}#{dest}"
        endStub.called.should.be.ok()
