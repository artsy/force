_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
rewire    = require 'rewire'
routes    = rewire '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {}, logout: sinon.stub(), user: new Backbone.Model(), body: {}, query: {}, get: -> }
    @res = { render: sinon.stub(), locals: { sd: {} }, send: sinon.stub(), redirect: sinon.stub() }

  describe '#index', ->

    it 'renders the homepage', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'

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
