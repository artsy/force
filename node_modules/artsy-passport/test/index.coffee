Backbone = require 'backbone'
Browser = require 'zombie'
rewire = require 'rewire'
app = require '../example'
sinon = require 'sinon'
{ ARTSY_EMAIL, ARTSY_PASSWORD, TWITTER_EMAIL, TWITTER_PASSWORD,
  FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require '../config'

describe 'Artsy Passport integration', ->

  before (done) ->
    app.listen 5000, done

  it 'can log in with email and password', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser
        .fill('email', ARTSY_EMAIL)
        .fill('password', ARTSY_PASSWORD)
        .pressButton "Login", ->
          browser.html().should.include '<h1>Hello'
          browser.html().should.include ARTSY_EMAIL
          done()

  it 'can log in with facebook', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser.clickLink "Login via Facebook", ->
        browser.location.href.should.include 'facebook.com'
        browser
          .fill('email', FACEBOOK_EMAIL)
          .fill('pass', FACEBOOK_PASSWORD)
          .pressButton 'Log In', -> done()

  it 'can log in with twitter', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser.clickLink "Login via Twitter", ->
        browser.location.href.should.include 'twitter.com'
        browser
          .fill('session[username_or_email]', TWITTER_EMAIL)
          .fill('session[password]', TWITTER_PASSWORD)
          .pressButton 'Authorize app', -> done()

  it 'can sign up with email and password', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser
        .fill('name', 'Foobar')
        .fill('.signup [name="email"]', ARTSY_EMAIL)
        .fill('.signup [name="password"]', ARTSY_PASSWORD)
        .pressButton "Signup", ->
          browser.html().should.include 'Personalize Flow for'
          done()

describe 'Artsy Passport methods', ->

  before ->
    @artsyPassport = rewire '../index.coffee'

  describe '#serializeUser', ->

    before ->
      @serializeUser = @artsyPassport.__get__ 'serializeUser'

    it 'only stores select data in the session', (done) ->
      model = new Backbone.Model({ id: 'craig', foo: 'baz', bam: 'bop' })
      model.fetch = (opts) -> opts.success()
      @serializeUser model, (err, user) ->
        (user.foo?).should.not.be.ok
        (user.bam?).should.not.be.ok
        done()

  describe '#accessTokenCallback', ->

    before ->
      opts = @artsyPassport.__get__ 'opts'
      opts.CurrentUser = ->
      @accessTokenCallback = @artsyPassport.__get__ 'accessTokenCallback'
      @request = @artsyPassport.__get__ 'request'

    it 'is okay if there is no response object', ->
      @accessTokenCallback(->)({ bad: 'news' }, null)

    it 'sends error messages in an error object', (done) ->
      @accessTokenCallback((err) ->
        err.should.include 'Epic Fail'
        done()
      )(null, { body: error_description: 'Epic Fail' })


    context 'With a "no account linked" error', ->

      beforeEach ->
        sinon.stub @request, 'post'
        end = sinon.stub()
        @done = sinon.stub()
        @request.post.returns send: => end: end
        @accessTokenCallback(@done, { xapp_token: 'foobar' })(
          null,
          { body: error_description: 'no account linked' }
        )
        @end = end.args[0][0]

      afterEach ->
        @request.post.restore()

      it 'creates a user', ->
        @request.post.args[0][0].should.include '/api/v1/user'

      it 'passes a custom error for our socialSignup callback to redirect to login', ->
        @end null, body: { name: 'Craig' }
        @done.args[0][0].should.equal 'artsy-passport: created user from social'

  describe '#socialSignup', ->

    before ->
      opts = @artsyPassport.__get__ 'opts'
      opts.CurrentUser = ->
      @socialSignup = @artsyPassport.__get__ 'socialSignup'
      @err = ''
      @req = { query: {} }
      @res = { redirect: sinon.stub() }
      @next = sinon.stub()

    it 'passes on unless the error is our custom error message', ->
      @socialSignup('twitter')('Some other error', @req, @res, @next)
      @next.called.should.be.ok

    it 'strips out the expired auth query params before logging in', ->
      @req.query.code = 'foo'
      @req.query.oauth_token = 'bar'
      @req.query.oauth_verifier = 'baz'
      @socialSignup('twitter')('artsy-passport: created user from social', @req, @res, @next)
      @res.redirect.args[0][0].should.not.include 'foo'
      @res.redirect.args[0][0].should.not.include 'bar'
      @res.redirect.args[0][0].should.not.include 'baz'

    it 'redirects to log in', ->
      @socialSignup('twitter')('artsy-passport: created user from social', @req, @res, @next)
      @res.redirect.args[0][0].should.include '/users/auth/twitter'
