_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Search = require '../../../collections/search'
{ fabricate } = require 'antigravity'

describe 'Search routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'makes the appropriate request', ->
      req = { params: {}, query: { q: 'foobar' } }
      res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index req, res
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][2].data.term.should.equal 'foobar'

    it 'redirects without query', ->
      req = { params: {}, query: { } }
      res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
      routes.index req, res
      res.redirect.args[0][0].should.equal '/'
