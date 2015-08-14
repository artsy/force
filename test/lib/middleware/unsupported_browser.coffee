rewire = require 'rewire'
sinon = require 'sinon'
redirectBadBrowsers = rewire '../../../lib/middleware/unsupported_browser.coffee'

describe 'Redirect for unsupported browsers', ->

  beforeEach ->
    @badBrowserUA = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)'
    @safari5UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10'
    @goodBrowserUA = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25'
    @req =
      params: {}
      headers: { 'user-agent': @badBrowserUA }
      path: '/'
      cookies: {}
      body: {}
      query: {}
      get: sinon.stub()
    @res = { redirect: sinon.stub(), locals: { sd: {} } }
    @next = sinon.stub()

  it 'ignores good browsers', ->
    @req.headers['user-agent'] = @goodBrowserUA
    redirectBadBrowsers @req, @res, @next
    @next.callCount.should.equal 1

  it 'ignores requests for assets', ->
    @req.path = '/fonts/avante-garde.ttf'
    redirectBadBrowsers @req, @res, @next
    @next.callCount.should.equal 1
    @req.path = '/assets/css/all.css'
    redirectBadBrowsers @req, @res, @next
    @next.callCount.should.equal 2
    @req.path = '/images/logo.png'
    redirectBadBrowsers @req, @res, @next
    @next.callCount.should.equal 3

  it 'ignores requests for the unsupported-browser page', ->
    @req.path = '/unsupported-browser'
    redirectBadBrowsers @req, @res, @next
    @next.callCount.should.equal 1

  it 'redirects bad browsers', ->
    redirectBadBrowsers @req, @res, @next
    @res.redirect.args[0][0].should.containEql '/unsupported-browser'
    @next.callCount.should.equal 0

  it 'redirects safari 5', ->
    @req.headers['user-agent'] = @safari5UA
    redirectBadBrowsers @req, @res, @next
    @res.redirect.args[0][0].should.containEql '/unsupported-browser'
    @next.callCount.should.equal 0

  it 'does not redirect bad browsers that have set a cookie to continue anyway', ->
    @req.cookies.continue_with_bad_browser = 1
    redirectBadBrowsers @req, @res, @next
    @res.redirect.called.should.not.be.ok()
