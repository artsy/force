sinon = require 'sinon'
routes = require '../routes'
Backbone = require 'backbone'

describe 'Galleries routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      routes.index @req, @res

    it 'renders the galleries page', ->
      Backbone.sync.args[0][2].success []
      @res.render.args[0][0].should.equal 'template'
