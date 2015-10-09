rewire = require 'rewire'
sinon = require 'sinon'
trustTokenMiddleware = rewire '../../../lib/middleware/trust_token'

describe 'trustTokenMiddleware', ->
  beforeEach ->
    @__request__ = trustTokenMiddleware.__get__ 'request'

    @request = {}
    @request.post = sinon.stub().returns @request
    @request.send = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request

    trustTokenMiddleware.__set__ 'request', @request

  afterEach ->
    trustTokenMiddleware.__set__ 'request', @__request__

  it 'immediately nexts if there is no trust_token query param', ->
    req = query: {}, url: '/target-path'
    res = redirect: sinon.stub()
    next = sinon.stub()

    trustTokenMiddleware req, res, next

    @request.post.called.should.be.false()
    next.called.should.be.true()
    res.redirect.called.should.be.false()

  it 'logs the user in when there is a trust_token present, redirecting to a url sans trust_token param', ->
    req =
      login: sinon.stub().yields null
      query: trust_token: 'xxxx'
      url: '/target-path?trust_token=xxxx'
    res = redirect: sinon.stub()
    next = sinon.stub()
    @request.end.yields null, ok: true, body: access_token: 'yyy'

    trustTokenMiddleware req, res, next

    @request.post.called.should.be.true()
    @request.send.args[0][0].code.should.equal 'xxxx'

    res.redirect.called.should.be.true()
    res.redirect.args[0][0].should.equal '/target-path'

  it 'preserves any other query string params', ->
    req =
      login: sinon.stub().yields null
      query: trust_token: 'xxxx', foo: 'bar', bar: 'baz'
      url: '/target-path?foo=bar&trust_token=xxxx&bar=baz'
    res = redirect: sinon.stub()
    next = sinon.stub()
    @request.end.yields null, ok: true, body: access_token: 'yyy'

    trustTokenMiddleware req, res, next

    res.redirect.args[0][0].should.equal '/target-path?foo=bar&bar=baz'

  it 'nexts on failed code response', ->
    req =
      query: trust_token: 'xxxx'
      url: '/target-path?trust_token=xxxx'
    res = redirect: sinon.stub()
    next = sinon.stub()
    @request.end.yields 'err', null

    trustTokenMiddleware req, res, next

    next.called.should.be.true()
    res.redirect.called.should.be.false()
