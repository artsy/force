_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Articles = require '../../../collections/articles'
ArticleView = benv.requireWithJadeify resolve(__dirname, '../article'), ['template']
ArticlesFeedView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template', 'button', 'empty']
ArticlesFeedView.__set__ 'ArticleView', ArticleView

describe 'ArticlesFeedView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'with an empty collection', ->
    beforeEach ->
      @view = new ArticlesFeedView collection: new Articles

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the empty state', ->
        @view.$('.articles-feed-item').should.have.lengthOf 1
        @view.$('.js-articles-feed-more').is(':empty').should.be.true()
        @view.$('.articles-feed-item').text().should.equal 'No results. View all articles'

  describe 'with an articles collection', ->
    beforeEach ->
      @articles = new Articles [
        { id: _.uniqueId(), thumbnail_title: 'Foo Bar', contributing_authors: [] }
        { id: _.uniqueId(), thumbnail_title: 'Bar Baz', contributing_authors: [] }
      ]
      @articles.count = 10
      @view = new ArticlesFeedView collection: @articles

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the articles', ->
        @view.$('.articles-feed-item').should.have.lengthOf 2
        @view.$('.article-figure-title').map(-> $(this).text()).get()
          .should.eql ['Foo Bar', 'Bar Baz']

      it 'renders the button', ->
        @view.$('button').text().should.equal 'More Articles (8)'
