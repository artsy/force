_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {}, logout: sinon.stub() }
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
      @res.redirect.args[0][0].should.equal '/'

  describe '#redirectAfterLogin', ->

    beforeEach ->
      @req = { session: {}, body: {} }
      @res = { redirect: sinon.stub() }

    it 'redirects to redirect-to', ->
      @req.body['redirect-to'] = '/foo/bar'
      routes.redirectAfterLogin @req, @res
      @res.redirect.args[0][0].should.include '/foo/bar'

    it 'redirects to the signup referrer page stored in the session', ->
      @req.session.signupReferrer = '/feature/two-x-two'
      routes.redirectAfterLogin @req, @res
      @res.redirect.args[0][0].should.include '/feature/two-x-two'
