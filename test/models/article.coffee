_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Article = require '../../models/article.coffee'
Articles = require '../../collections/articles.coffee'
sinon = require 'sinon'
fixtures = require '../helpers/fixtures.coffee'

describe "Article", ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').returns Q.defer()
    @article = new Article

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchWithRelated', ->

    it 'gets all the related data from the article', (done) ->
      @article.set sections: []
      @article.fetchWithRelated success: (data) ->
        data.article.get('title').should.equal 'Moo'
        done()
      Backbone.sync.args[0][2].success _.extend {}, fixtures.article, title: 'Moo'
      Backbone.sync.args[1][2].success [fixtures.article]
      Backbone.sync.args[2][2].success [fixtures.article]

    xit 'gets the slideshow artworks', (done) ->
      @article.fetchWithRelated success: (data) ->
        # It looks like there's a very tight race condition here between
        # the success callback and the promise resolution.
        _.defer => _.defer =>
          data.slideshowArtworks.first().get('title').should.equal 'foobar'
          done()
      Backbone.sync.args[0][2].success _.extend {}, fixtures.article,
        title: 'Moo', sections: [type: 'slideshow', items: [type: 'artwork', id: 'foo']]
      Backbone.sync.args[1][2].success [fixtures.article]
      _.defer =>
        Backbone.sync.args[2][2].success fabricate 'artwork', title: 'foobar'

    it 'fetches section content if need be', ->
      @article.fetchWithRelated success: (data) ->
        data.slideshowArtworks.first().get('title').should.equal 'foobar'
        done()
      Backbone.sync.args[0][2].success _.extend {}, fixtures.article, title: 'Moo', section_ids: ['foo']
      Backbone.sync.args[1][2].success [fixtures.article]
      Backbone.sync.args[2][2].success [fixtures.article]
      _.defer =>
        Backbone.sync.args[3][2].success fixtures.section
        Backbone.sync.args[4][2].success [fixtures.article]

    it 'works for those rare sectionless articles', (done) ->
      @article.fetchWithRelated success: (data) ->
        data.article.get('title').should.equal 'Moo'
        done()
      Backbone.sync.args[0][2].success _.extend {}, fixtures.article, title: 'Moo', sections: []
      Backbone.sync.args[1][2].success [fixtures.article]

    it 'fetches related articles for super articles', (done) ->
      @article.set sections: []
      @article.fetchWithRelated success: (data) ->
        _.defer => _.defer => _.defer =>
          data.relatedArticles.models[0].get('title').should.equal 'RelatedArticle'
          data.article.get('title').should.equal 'SuperArticle'
          done()

      Backbone.sync.args[0][2].success _.extend {}, fixtures.article,
        title: 'SuperArticle',
        is_super_article: true
        sections: []
        super_article:
          related_articles: ['id-1']

      Backbone.sync.args[1][2].success [fixtures.article]
      _.defer =>
        Backbone.sync.args[3][2].success _.extend {}, fixtures.article, title: 'RelatedArticle', id: 'id-1'

      Backbone.sync.args[2][2].success [fixtures.article]

    xit 'fetches related articles for article in super article', (done) ->
      Backbone.sync.restore()
      relatedArticle1 = _.extend {}, fixtures.article,
        id: 'id-1'
        title: 'RelatedArticle 1',
        sections: []
      relatedArticle2 = _.extend {}, fixtures.article,
        id: 'id-2'
        title: 'RelatedArticle 2',
        sections: []
      superArticle = _.extend {}, fixtures.article,
        id: 'id-3'
        title: 'SuperArticle',
        is_super_article: true
        sections: []
        super_article:
          related_articles: ['id-1', 'id-2']

      sinon.stub Backbone, 'sync'
        .onCall 0
        .yieldsTo 'success', superArticle
        .returns Q.resolve superArticle
        .onCall 1
        .yieldsTo 'success', relatedArticle1
        .returns Q.resolve relatedArticle1
        .onCall 2
        .yieldsTo 'success', relatedArticle2
        .returns Q.resolve relatedArticle2
        .onCall 3
        .yieldsTo 'success', relatedArticle1
        .returns Q.resolve relatedArticle1
        .onCall 4
        .returns Q.resolve()

      @article.fetchWithRelated success: (data) ->
        data.superArticle.get('title').should.equal 'SuperArticle'
        data.relatedArticles.models[0].get('title').should.equal 'RelatedArticle 1'
        data.relatedArticles.models[1].get('title').should.equal 'RelatedArticle 2'
        done()

  describe '#strip', ->
    it 'returns the attr without tags', ->
      @article.set 'lead_paragraph', '<p><br></p>'
      @article.strip('lead_paragraph').should.equal ''
      @article.set 'lead_paragraph', '<p>Existy</p>'
      @article.strip('lead_paragraph').should.equal 'Existy'
