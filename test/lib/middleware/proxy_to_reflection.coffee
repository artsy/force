_                   = require 'underscore'
sinon               = require 'sinon'
rewire              = require 'rewire'
{ REFLECTION_URL }  = require '../../../config'

{ middleware, proxy } = mod = rewire '../../../lib/middleware/proxy_to_reflection'

endStub   = sinon.stub()
getStub   = sinon.stub()
mod.__set__ 'request',
  get: (url) ->
    getStub url
    end: endStub

describe 'proxy', ->
  describe '#compileRoute', ->
    it 'transforms the route pattern into a string to be used in a regular expression', ->
      proxy.compileRoute('/artwork/:artwork_id/view-in-room').
        should.equal '^/artwork/([^/?]+)/view-in-room(?:\\?([\\s\\S]*))?$'
      proxy.compileRoute('/foo/:bar/baz/:qux/:quux').
        should.equal '^/foo/([^/?]+)/baz/([^/?]+)/([^/?]+)(?:\\?([\\s\\S]*))?$'

    it 'returns a string that matches the correct routes', ->
      route   = '/artwork/foo-bar/view-in-room'
      re      = new RegExp(proxy.compileRoute('/artwork/:artwork_id/view-in-room'))
      re.test(route).should.be.ok
      re.test('/artwork/foo-bar').should.not.be.ok
      re.test('/artwork/foo-bar/zoom').should.not.be.ok

    it 'returns a string that matches namedParams', ->
      route   = '/artwork/foo-bar/view-in-room'
      re      = new RegExp(proxy.compileRoute('/artwork/:artwork_id/view-in-room'))
      route.match(re)[0].should.equal '/artwork/foo-bar/view-in-room'
      route.match(re)[1].should.equal 'foo-bar'

  describe '#detectRoute', ->
    it 'finds the matching route given a URL', ->
      route = proxy.detectRoute('/artwork/foo-bar/view-in-room')
      route.should.equal '^/artwork/([^/?]+)/view-in-room(?:\\?([\\s\\S]*))?$'
      proxy.compiledBlacklist()[route].should.be.an.instanceOf Function
      proxy.compiledBlacklist()[route](null, 'bar-baz').should.equal '/artwork/bar-baz'

  describe '#compiledBlacklist', ->
    it 'returns an object that has compiled the blacklist keys into strings for regular expressions', ->
      keys = _.keys(proxy.compiledBlacklist())
      keys.length.should.equal 4
      keys[0].should.equal '^/artwork/([^/?]+)/view-in-room(?:\\?([\\s\\S]*))?$'

describe 'middleware', ->
  beforeEach ->
    @req    = url: '/artwork/foo-bar/view-in-room', query: {}
    @res    = {}
    @next   = sinon.stub()

  it 'passes through when there is no escaped fragment query param', ->
    middleware @req, @res, @next
    @next.called.should.be.ok

  describe 'with _escaped_fragment_ and OK URL', ->
    beforeEach ->
      @req.query._escaped_fragment_ = 'existy'
      @req.url = '/artwork/bar-baz/not-blacklisted'

    it 'intercepts the request and redirects if the escaped fargment query param is present', ->
      middleware @req, @res, @next
      endStub.called.should.be.ok

    it 'leaves the URL alone', ->
      middleware @req, @res, @next
      _.last(getStub.args)[0].should.equal "#{REFLECTION_URL}/artwork/bar-baz/not-blacklisted"
      @req.url = '/artist/baz-qux'
      middleware @req, @res, @next
      _.last(getStub.args)[0].should.equal "#{REFLECTION_URL}/artist/baz-qux"

  describe 'with _escaped_fragment_ and blacklisted URL', ->
    beforeEach ->
      @req.query._escaped_fragment_ = 'existy'

    it 'intercepts the request and redirects if the escaped fargment query param is present', ->
      middleware @req, @res, @next
      endStub.called.should.be.ok

    it 'transforms the URL if it is blacklisted', ->
      middleware @req, @res, @next
      _.last(getStub.args)[0].should.equal "#{REFLECTION_URL}/artwork/foo-bar"
      @req.url = '/artwork/bar-baz/zoom'
      middleware @req, @res, @next
      _.last(getStub.args)[0].should.equal "#{REFLECTION_URL}/artwork/bar-baz"


