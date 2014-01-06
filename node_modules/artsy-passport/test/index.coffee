Browser = require 'zombie'
rewire = require 'rewire'
app = require '../example'
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

  describe '#accessTokenCallback', ->

    before ->
      opts = @artsyPassport.__get__ 'opts'
      opts.CurrentUser = ->
      @accessTokenCallback = @artsyPassport.__get__ 'accessTokenCallback'

    it 'is okay if there is no response object', ->
      @accessTokenCallback(->)({ bad: 'news' }, null)

    it 'sends error messages in an error object', (done) ->
      @accessTokenCallback((err) ->
        err.message.should.include 'Epic Fail'
        done()
      )(null, { body: error_description: 'Epic Fail' })