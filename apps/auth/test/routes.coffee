_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'

describe 'Auth routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: {} } }

  describe '#index', ->
    it 'renders the homepage'
