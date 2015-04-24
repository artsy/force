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
      @article.set sections: []
      @article.fetchWithRelated
        success: (data) ->
          data.article.get('title').should.equal 'Moo'
          done()
      Backbone.sync.args[0][2].success _.extend fixtures.article, title: 'Moo'
      Backbone.sync.args[1][2].success [fixtures.article]
      @dfd.resolve({})

    it 'gets the slideshow artworks', (done) ->
      @article.fetchWithRelated
        success: (data) ->
          data.slideshowArtworks.first().get('title').should.equal 'foobar'
          done()
      Backbone.sync.args[0][2].success _.extend fixtures.article,
        title: 'Moo'
        sections: [{ type: 'slideshow', items: [{ type: 'artwork', id: 'foo'}] }]
      Backbone.sync.args[1][2].success [fixtures.article]
      Backbone.sync.returns (dfd = Q.defer()).promise
      @dfd.resolve({})
      _.defer =>
        Backbone.sync.args[2][2].success fabricate 'artwork', title: 'foobar'
        dfd.resolve()

    it 'fetches vertical content if need be', ->
      @article.fetchWithRelated
        success: (data) ->
          data.slideshowArtworks.first().get('title').should.equal 'foobar'
          done()
      Backbone.sync.args[0][2].success _.extend fixtures.article,
        title: 'Moo'
        vertical_id: 'foo'
      Backbone.sync.args[1][2].success [fixtures.article]
      Backbone.sync.returns (dfd = Q.defer()).promise
      @dfd.resolve({})
      _.defer =>
        Backbone.sync.args[2][2].success fixtures.vertical
        Backbone.sync.args[3][2].success [fixtures.articles]
        dfd.resolve()

    it 'works for those rare sectionless articles', (done) ->
      @article.fetchWithRelated
        success: (data) ->
          data.article.get('title').should.equal 'Moo'
          done()
      Backbone.sync.args[0][2].success _.extend fixtures.article,
        title: 'Moo'
        sections: []
      Backbone.sync.args[1][2].success [fixtures.article]
      @dfd.resolve({})


  describe '#strip', ->

    it 'returns the attr without tags', ->
      @article.set 'lead_paragraph', '<p><br></p>'
      @article.strip('lead_paragraph').should.equal ''
      @article.set 'lead_paragraph', '<p>Existy</p>'
      @article.strip('lead_paragraph').should.equal 'Existy'
