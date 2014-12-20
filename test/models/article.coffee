_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Article = require '../../models/article.coffee'
sinon = require 'sinon'
fixtures = require '../helpers/fixtures.coffee'
Q = require 'q'

describe "Article", ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @article = new Article
    Backbone.sync.returns (@dfd = Q.defer()).promise

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchWithRelated', ->

    it 'gets all the related data from the article', (done) ->
      @article.fetchWithRelated
        success: (article, author, footerArticles, slideshowArtworks) ->
          article.get('title').should.equal 'Moo'
          done()
      Backbone.sync.args[0][2].success _.extend fixtures.article, title: 'Moo'
      Backbone.sync.args[1][2].success [fixtures.article]
      @dfd.resolve({})