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

  describe '#feed', ->

    it 'pulls the rest of the articles not in featured', ->
      @articles.set [
        { tier: 1, id: 'foo' }
        { tier: 1, id: 'bar' }
        { tier: 2, id: 'baz' }
        { tier: 1, id: 'qux' }
        { tier: 2, id: 'bam' }
      ]
      _.pluck(@articles.feed(), 'id').join('').should.equal 'bazbam'

  describe '#featured', ->

    it 'pulls the top 4 tier 1s', ->
      @articles.set [
        { tier: 1, id: 'foo' }
        { tier: 1, id: 'bar' }
        { tier: 2, id: 'baz' }
        { tier: 1, id: 'qux' }
        { tier: 2, id: 'bam' }
        { tier: 1, id: 'moo' }
        { tier: 2, id: 'boom' }
      ]
      _.pluck(@articles.featured(), 'id').join('').should.equal 'foobarquxmoo'

  describe 'biography', ->

    it 'pulls a biography out of the articles', ->
      @articles.set [
        { tier: 1, id: 'foo' }
        { tier: 1, id: 'bar' }
        { tier: 2, id: 'baz', biography_for_artist_id: 'asdfsa' }
        { tier: 1, id: 'qux' }
        { tier: 2, id: 'bam' }
        { tier: 1, id: 'moo' }
        { tier: 2, id: 'boom' }
      ]
      @articles.biography().id.should.equal 'baz'

  describe '#orderByIds', ->

    it 'orders collection by ids give - dropping other items', ->
      @articles.set [
        { tier: 1, id: 'foo' }
        { tier: 1, id: 'bar' }
        { tier: 2, id: 'boom' }
      ]
      @articles.orderByIds ['boom', 'bar', 'foo']
      @articles.length.should.equal 3
      @articles.models[0].id.should.equal 'boom'
      @articles.models[1].id.should.equal 'bar'
      @articles.models[2].id.should.equal 'foo'
