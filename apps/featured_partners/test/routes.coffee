{ fabricate } = require 'antigravity'
_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
routes        = require '../routes'
Q             = require 'Q'

describe 'Partners routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: {} }
    @res = { render: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://' } } }

  afterEach ->
    Backbone.sync.restore()

  describe '#partners', ->
    it 'populates featured partners'

    it 'renders the featured partners'
