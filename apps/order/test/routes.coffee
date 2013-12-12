_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'

describe 'Order routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} } }

  describe '#index', ->

    it 'renders the order page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'