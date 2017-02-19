sinon = require 'sinon'
rewire = require 'rewire'
http = require 'http'
express = require 'express'
{ forUnsupportedRoute, forDesktopBrowser } = mod = rewire '../../../lib/middleware/redirect_to_gravity'
mod.__set__ 'ARTSY_URL', 'http://localhost:5001'

describe '#forUnsupportedRoute', ->

  beforeEach (done) ->
    @req = { path: '/foo/bar', query: { baz: 'qux' }, url: '/foo/bar?baz=qux' }
    @res = { send: sinon.stub() }
    @next = sinon.stub()
    @app = express()
    @app.get '/foo/bar', (req, res) ->
      res.send req.protocol + '://' + req.get('host') + req.originalUrl
    @app.get '/fail', (req, res) ->
      res.sendStatus 404
    @server = @app.listen 5001, -> done()

  afterEach ->
    @server.close()

  it 'proxies the force page if its supported', (done) ->
    @res.send = (txt) ->
      txt.should.containEql 'foo/bar'
      done()
    forUnsupportedRoute @req, @res, done
    return

  it 'passes to the next middleware if the route is 404 on Force', (done) ->
    @req.path = '/fail'
    @req.url = '/fail'
    @req.query = {}
    forUnsupportedRoute @req, @res, done
    return

describe '#forDesktopBrowser', ->

  it 'redirect desktop browsers to gravity', ->
    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.65 Safari/537.36"
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: spy = sinon.spy() }, ->
    )
    spy.args[0][0].should.equal 'http://localhost:5001/foo/bar'

  it 'redirect ipad browsers to gravity', ->
    ua = "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10"
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: spy = sinon.spy() }, ->
    )
    spy.args[0][0].should.equal 'http://localhost:5001/foo/bar'

  it 'redirect Twitterbot to gravity', ->
    ua = "Twitterbot/1.0"
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: spy = sinon.spy() }, ->
    )
    spy.args[0][0].should.equal 301
    spy.args[0][1].should.equal 'http://localhost:5001/foo/bar'

  it 'reirect Facebook bot to gravity', ->
    ua = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: spy = sinon.spy() }, ->
    )
    spy.args[0][0].should.equal 301
    spy.args[0][1].should.equal 'http://localhost:5001/foo/bar'

  it 'does not redirect if mobile', ->
    ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3"
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: -> }, nextSpy = sinon.spy()
    )
    nextSpy.called.should.be.ok()

  it 'does not redirect or error if empty useragent', ->
    ua = ''
    forDesktopBrowser(
      { url: '/foo/bar', headers: { 'user-agent': ua } }, { redirect: -> }, nextSpy = sinon.spy()
    )
    nextSpy.called.should.be.ok()
