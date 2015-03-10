Backbone = require 'backbone'
Browser = require 'zombie'
rewire = require 'rewire'
app = require '../example'
sinon = require 'sinon'
crypto = require 'crypto'
{ ARTSY_EMAIL, ARTSY_PASSWORD, TWITTER_EMAIL, TWITTER_PASSWORD,
  FACEBOOK_EMAIL, FACEBOOK_PASSWORD } = require '../config'

describe 'Artsy Passport integration', ->

  before (done) ->
    app.listen 5000, done

  it 'can log in and log out with email and password', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser
        .fill('#login [name=email]', ARTSY_EMAIL)
        .fill('#login [name=password]', ARTSY_PASSWORD)
        .pressButton "#login [type=submit]", ->
          browser.html().should.containEql '<h1>Hello'
          browser.html().should.containEql ARTSY_EMAIL
          browser
            .clickLink "Logout", ->
              browser.reload ->
                browser.html().should.containEql '<h1>Login'
                done()

  it 'can log in with facebook', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser.clickLink "Login via Facebook", ->
        browser.location.href.should.containEql 'facebook.com'
        browser
          .fill('email', FACEBOOK_EMAIL)
          .fill('pass', FACEBOOK_PASSWORD)
          .pressButton 'Log In', -> done()

  it 'can log in with twitter', (done) ->
    Browser.visit 'http://localhost:5000', (e, browser) ->
      browser.clickLink "Login via Twitter", ->
        browser.location.href.should.containEql 'twitter.com'
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
          browser.html().should.containEql 'Personalize Flow for'
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
        err.should.containEql 'Epic Fail'
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
        @request.post.args[0][0].should.containEql '/api/v1/user'

      it 'passes a custom error for our socialSignup callback to redirect to login', ->
        @end null, body: { name: 'Craig' }
        @done.args[0][0].message.should.equal 'artsy-passport: created user from social'

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
      @socialSignup('twitter')({message: 'artsy-passport: created user from social'}, @req, @res, @next)
      @res.redirect.args[0][0].should.not.containEql 'foo'
      @res.redirect.args[0][0].should.not.containEql 'bar'
      @res.redirect.args[0][0].should.not.containEql 'baz'

    it 'redirects to log in', ->
      @socialSignup('twitter')({message: 'artsy-passport: created user from social'}, @req, @res, @next)
      @res.redirect.args[0][0].should.containEql '/users/auth/twitter'


  describe '#socialAuth', ->

    beforeEach ->
      opts = @artsyPassport.__get__ 'opts'
      opts.CurrentUser = ->
      @socialAuth = @artsyPassport.__get__ 'socialAuth'
      @err = ''
      @req = { query: {} }
      @res = { redirect: sinon.stub(), locals: {} }
      @next = sinon.stub()

    it 'authenticates if state param is sha1 of access token', ->
      passport = @artsyPassport.__get__ 'passport'
      sinon.spy passport, 'authenticate'
      @req.user = new Backbone.Model accessToken: 'foobarbaz'
      @req.query.state = crypto.createHash('sha1').update('foobarbaz').digest('hex')
      @socialAuth('facebook')(@req, @res, @next)
      passport.authenticate.args[0][0].should.equal 'facebook'

    it 'requires a state param equal to the sha1 of the access token', ->
      @req.user = new Backbone.Model accessToken: 'foobarbaz'
      @socialAuth('facebook')(@req, @res, @next)
      @next.args[0][0].toString().should.containEql 'Must pass a `state`'

  describe '#submitTwitterLastStep', ->

    before ->
      opts = @artsyPassport.__get__ 'opts'
      @submitTwitterLastStep = @artsyPassport.__get__ 'submitTwitterLastStep'
      @request = @artsyPassport.__get__ 'request'
      @req = { query: {}, user: { get: -> 'access-foo-token' } }
      @res = { redirect: sinon.stub() }
      @next = sinon.stub()

    it 'creates a user', (done) ->
      @req.body = email: 'foo@bar.com', email_confirmation: 'foo@bar.com'
      @request.put = (url) ->
        url.should.containEql 'api/v1/me'
        send: (data) ->
          data.email.should.equal 'foo@bar.com'
          data.email_confirmation.should.equal 'foo@bar.com'
          done()
          end: ->
      @req.param = -> 'foo@bar.com'
      @submitTwitterLastStep @req, @res, @next

    it 'logs in the JSON from the PUT call'

  describe '#afterLocalAuth', ->

    beforeEach ->
      opts = @artsyPassport.__get__ 'opts'
      @afterLocalAuth = @artsyPassport.__get__ 'afterLocalAuth'
      @req = { query: {}, user: { get: -> 'access-foo-token' }, xhr: {} }
      @res = { send: sinon.stub() }
      @next = sinon.stub()

    it 'throws a 403 if there is an auth error', ->
      @res.authError = 'foobar'
      @afterLocalAuth @req, @res
      @res.send.args[0][0].should.equal 403

    it 'returns json success for ajax calls', ->
      @req.accepts = -> true
      @req.user = { toJSON: -> }
      @afterLocalAuth @req, @res
      @res.send.args[0][0].success.should.be.ok

  describe '#headerLogin', ->

    beforeEach ->
      opts = @artsyPassport.__get__ 'opts'
      opts.CurrentUser = Backbone.Model
      @headerLogin = @artsyPassport.__get__ 'headerLogin'
      @req = { query: {}, get: (-> 'access-foo-token'), login: sinon.stub() }
      @res = { send: sinon.stub() }
      @next = sinon.stub()

    it 'logs in a user if they pass their access token as a header', ->
      @headerLogin @req, @res, @next
      @req.login.args[0][0].get('accessToken').should.equal 'access-foo-token'

    it 'does not log in a user on sign out', ->
      @req.path = '/users/sign_out'
      @headerLogin @req, @res, @next
      @next.called.should.equal true

  describe '#logout', ->
    beforeEach ->
      @send = sinon.stub().returns(end: (cb) -> cb())
      @del = sinon.stub().returns(send: @send)
      @logout = @artsyPassport.__get__ 'logout'
      @req = { query: {}, get: (-> 'access-foo-token'), logout: (=> @req.user = null), user: { get: -> 'secret' } }
      @res = { send: sinon.stub() }
      @logoutSpy = sinon.spy(@req, 'logout');
      @next = sinon.stub()

    it 'logs out, deletes the auth token, and redirects home', ->
      @artsyPassport.__set__ 'request', del: @del
      @logout @req, @res, @next
      @logoutSpy.called.should.be.true
      @del.args[0][0].should.containEql '/api/v1/access_token'
      @send.args[0][0].should.eql access_token: 'secret'
      (@req.user?).should.not.be.ok
      @next.called.should.be.true

    it 'logs out, deletes the auth token, and redirects home', ->
      @artsyPassport.__set__ 'request', del: -> send: -> end: (cb) -> cb({ error: true }, { code: 500, error: 'Fake error', ok: false })
      @logout @req, @res, @next
      @next.called.should.be.true

    it 'still works if there is no access token', ->
      @req.user = undefined
      @logout @req, @res, @next
      @logoutSpy.called.should.be.true
      (@req.user?).should.not.be.ok
      @del.called.should.not.be.ok
      @next.called.should.be.true

  describe '#initPassport', ->

    it 'uses state: true for Facebook', ->
      args = []
      Strategy = @artsyPassport.__get__ 'FacebookStrategy'
      class FacebookStrategy extends Strategy
        constructor: ->
          args = arguments
          super
      @artsyPassport.__set__ 'FacebookStrategy', FacebookStrategy
      @artsyPassport.__set__ 'opts',
        FACEBOOK_ID: 'foo'
        FACEBOOK_SECRET: 'bar'
        TWITTER_KEY: 'bam'
        TWITTER_SECRET: 'baz'
      @artsyPassport.__get__('initPassport')()
      args[0].state.should.equal true
