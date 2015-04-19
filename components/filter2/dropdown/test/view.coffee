_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate2 } = require 'antigravity'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'Filter / Dropdown', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        _s: require('underscore.string')
        sd:
          FILTER_ROOT: '/browse'
      Backbone.$ = $
      DropdownView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
      @view = new DropdownView
        el: $ "<div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
        facets: ['price_range', 'dimension_range', 'medium']
        facet: 'price_range'

      done()

  afterEach ->
    benv.teardown()

  it 'renders properly', ->
    @view.renderCounts @view.collection

    @view.$('.filter-nav-main-text').text().should.equal 'Price'
    @view.$('.filter-nav-active-text').text().should.equal ''
    @view.$('.filter-dropdown-nav > a').first().text().should.equal 'All Prices'
    @view.$('.filter-dropdown-nav > a:nth-child(2) .filter-dropdown-text').text().should.equal 'for Sale'
    @view.$('.filter-dropdown-nav > a:nth-child(2) .filter-dropdown-count').text().should.equal '(5,647)'

