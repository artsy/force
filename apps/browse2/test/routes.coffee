sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Browse routes', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync')
    @req = {}
    @res = render: sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'fetches the filter suggestions and renders the template', ->
      routes.index @req, @res
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/filter/artworks'
