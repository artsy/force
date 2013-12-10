_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} }, send: sinon.stub() }

  describe '#index', ->

    it 'renders the homepage', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'

  describe '#submitLogin', ->

    it 'sends success', ->
      routes.submitLogin @req, @res
      @res.send.args[0][0].success.should.equal true