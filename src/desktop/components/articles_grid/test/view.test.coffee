_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
ArticlesGridView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template', 'button', 'empty', 'figure']

describe 'ArticlesGridView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd: ARTSY_EDITORIAL_CHANNEL: '123'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'with an empty collection', ->
    beforeEach ->
      @view = new ArticlesGridView collection: new Articles

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the empty state', ->
        @view.$('.articles-grid__figure').should.have.lengthOf 1
        @view.$('.js-articles-grid-more').is(':empty').should.be.true()
        @view.$('.articles-grid__figure').text().should.equal 'No results. View all articles'

  describe 'with an articles collection', ->
    beforeEach ->
      @articles = new Articles [
        { id: _.uniqueId(), thumbnail_title: 'Foo Bar', contributing_authors: [], author: {name: 'Molly'} }
        { id: _.uniqueId(), thumbnail_title: 'Foo Baz', contributing_authors: [], author_id: '123', author: {name: 'Artsy Editorial'} }
        { id: _.uniqueId(), thumbnail_title: 'Bar Baz', contributing_authors: [{name: 'Jon Snow'}], author: {name: 'Halley'}}
        { id: _.uniqueId(), thumbnail_title: 'Bar Bar', contributing_authors: [{name: 'Sansa Stark'}, {name: 'Tyrion Lannister'}], channel_id: '123', author: {name: 'Artsy Editorial'} }
      ]
      @articles.count = 15

    describe '#render', ->

      it 'renders the articles', ->
        @view = new ArticlesGridView collection: @articles
        @view.render()
        @view.$('.articles-grid__figure').should.have.lengthOf 4
        @view.$('.articles-grid__title').map(-> $(this).text()).get()
          .should.eql ['Foo Bar', 'Foo Baz', 'Bar Baz', 'Bar Bar']

      it 'renders the button', ->
        @view = new ArticlesGridView collection: @articles
        @view.render()
        @view.$('button').text().should.equal 'More Articles (11)'

      it 'renders the author name', ->
        @view = new ArticlesGridView collection: @articles
        @view.render()
        @view.$('.articles-grid__author').map(-> $(this).text()).get()
          .should.eql ['Molly', 'Artsy Editorial', 'Jon Snow', 'Artsy Editorial  •  Sansa Stark and Tyrion Lannister']

      it 'does not render the button if specified', ->
        @view = new ArticlesGridView
          collection: @articles
          hideMore: true
        @view.render()
        @view.$('button').length.should.equal 0

      it 'renders the header if specified', ->
        @view = new ArticlesGridView
          collection: @articles
          header: 'Custom Header'
        @view.render()
        @view.$('.articles-grid__header').text().should.containEql 'Custom Header'

      it 'does not render anything if the length of collection is 0 and it is from a partner article', ->
        article = new Article fabricate 'article'
        @view = new ArticlesGridView
          collection: new Articles [article]
          article: article
          partner: fabricate 'partner'
        @view.render()
        $(@view.$el).children().length.should.equal 0

      it 'removes the current article from More By section on a partner article', ->
        article = new Article fabricate 'article'
        article2 = new Article fabricate 'article', {id: '100'}
        @view = new ArticlesGridView
          collection: new Articles [article, article2]
          article: article
          partner: fabricate 'partner'
        @view.render()
        @view.$('.articles-grid__articles figure').length.should.equal 1
