_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
fixtures = require '../helpers/fixtures'
Articles = require '../../collections/articles'

describe 'Articles', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @articles = new Articles [fixtures.articles]

  afterEach ->
    Backbone.sync.restore()

  describe '#orderByIds', ->

    it 'orders collection by ids give - dropping other items', ->
      @articles.set [
        { id: 'foo' }
        { id: 'bar' }
        { id: 'boom' }
      ]
      @articles.orderByIds ['boom', 'bar', 'foo']
      @articles.length.should.equal 3
      @articles.models[0].id.should.equal 'boom'
      @articles.models[1].id.should.equal 'bar'
      @articles.models[2].id.should.equal 'foo'
