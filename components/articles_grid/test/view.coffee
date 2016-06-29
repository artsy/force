_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Articles = require '../../../collections/articles'
ArticlesGridView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template', 'button', 'empty', 'figure']

describe 'ArticlesGridView', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd: ARTSY_EDITORIAL_ID: '123'
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
        { id: _.uniqueId(), thumbnail_title: 'Bar Bar', contributing_authors: [{name: 'Sansa Stark'}, {name: 'Tyrion Lannister'}], author_id: '123', author: {name: 'Artsy Editorial'} }
      ]
      @articles.count = 15
      @view = new ArticlesGridView collection: @articles

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the articles', ->
        @view.$('.articles-grid__figure').should.have.lengthOf 4
        @view.$('.articles-grid__title').map(-> $(this).text()).get()
          .should.eql ['Foo Bar', 'Foo Baz', 'Bar Baz', 'Bar Bar']

      it 'renders the button', ->
        @view.$('button').text().should.equal 'More Articles (11)'

      it 'renders the author name', ->
        @view.$('.articles-grid__author').map(-> $(this).text()).get()
          .should.eql ['Molly', 'Artsy Editorial', 'Jon Snow', 'Artsy Editorial  •  Sansa Stark and Tyrion Lannister']
