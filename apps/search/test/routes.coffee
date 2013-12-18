_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
routes          = require '../routes'
Search          = require '../../../collections/search'
{ fabricate }   = require 'antigravity'

describe 'Search routes', ->
  beforeEach ->
    @req = { params: {}, query: { q: 'foobar' } }
    @res = { render: sinon.stub(), locals: { sd: {} } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      routes.index @req, @res

    it 'makes the appropriate request', ->
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][2].data.term.should.equal 'foobar'
