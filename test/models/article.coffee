_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Article = require '../../models/article.coffee'
sinon = require 'sinon'
fixtures = require '../helpers/fixtures.coffee'

describe "Article", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @article = new Article fixtures.article

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up a collection for slideshow artworks', ->
      @article.slideshowArtworks.pluck('id').join('')
        .should.equal '54276766fd4f50996aeca2b8'
