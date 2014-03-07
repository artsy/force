_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
rewire    = require 'rewire'
routes    = rewire '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {}, logout: sinon.stub(), user: new Backbone.Model(), body: {}, query: {}, get: -> }
    @res = { render: sinon.stub(), locals: { sd: {} }, send: sinon.stub(), redirect: sinon.stub() }

  describe '#resetPassword', ->

    it 'renders the homepage', ->
      routes.resetPassword @req, @res
      @res.render.args[0][0].should.equal 'templates/reset_password'

  describe '#twitterLastStep', ->

    it 'renders the homepage', ->
      routes.twitterLastStep @req, @res
      @res.render.args[0][0].should.equal 'templates/twitter_email'

  describe '#submitLogin', ->

    it 'sends success', ->
      routes.submitLogin @req, @res
      @res.send.args[0][0].success.should.equal true

  describe '#logout', ->

    it 'logs out and redirects home', ->
      routes.logout @req, @res
      @req.logout.called.should.be.ok
      @res.redirect.args[0][0].should.include '/users/sign_out?redirect_uri=http://localhost:3004'

  describe '#loginToArtsy', ->

    it 'single signs in to Artsy', ->
      request = routes.__get__ 'request'
      request.post = -> send: -> end: (callback) -> callback {
        body: {
          trust_token: 'foobar'
        }
      }
      @req.get = -> 'ref'
      routes.loginToArtsy @req, @res
      @res.redirect.args[0][0].should.include '/users/sign_in?trust_token=foobar'

    it 'follows a redirec to query param', ->
      @req.query['redirect-to'] = 'personalize/collect'
      routes.loginToArtsy @req, @res
      @res.redirect.args[0][0].should.include 'personalize/collect'

  describe '#submitTwitterLastStep', ->

    beforeEach ->
      @req = { get: (-> 'http://arts.net?redirect-to=/personalize'), body: { email: 'foo@bar.com' } }
      @res = { redirect: sinon.stub() }

    it 'redirects to twitter login passing through the email and redirect-to', ->
      routes.submitTwitterLastStep @req, @res
      @res.redirect.args[0][0].should.equal(
        '/force/users/auth/twitter?email=foo@bar.com&redirect-to=/personalize'
      )

  describe '#submitEmailForTwitter', ->

    beforeEach ->
      sinon.stub Backbone, 'sync'
      @req = { query: { email: 'foo@bar.com' }, user: new Backbone.Model() }
      @res = { redirect: sinon.stub() }
      @next = sinon.stub()

    afterEach ->
      Backbone.sync.restore()

    it "changes the twitter user's email and redirects to redirect-to", ->
      routes.submitEmailForTwitter @req, @res, @next
      Backbone.sync.called.should.be.ok
      @req.user.toJSON().email.should.equal 'foo@bar.com'
      @req.user.toJSON().email_confirmation.should.equal 'foo@bar.com'
      _.last(Backbone.sync.args)[2].success()
      @next.called.should.be.ok
