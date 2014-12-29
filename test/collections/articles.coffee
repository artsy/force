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
