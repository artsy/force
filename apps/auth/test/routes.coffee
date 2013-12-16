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