_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {}, logout: sinon.stub(), user: new Backbone.Model(), body: {}, query: {}, get: -> }
    @res = { render: sinon.stub(), locals: { sd: {} }, send: sinon.stub(), redirect: sinon.stub() }
    @next = sinon.stub()

  describe '#resetPassword', ->

    it 'renders the homepage', ->
      routes.resetPassword @req, @res
      @res.render.args[0][0].should.equal 'templates/reset_password'

  describe '#twitterLastStep', ->

    it 'renders the last step email page', ->
      routes.twitterLastStep @req, @res
      @res.render.args[0][0].should.equal 'templates/twitter_email'

  describe '#logout', ->

    it 'logs out and redirects home', ->
      routes.logout @req, @res, @next
      @req.logout.called.should.be.ok
