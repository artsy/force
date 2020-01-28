_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate2 } = require '@artsy/antigravity'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'Filter / Dropdown', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        _s: require('underscore.string')
        filterLabelMap: require '../label_map.coffee'
      Backbone.$ = $
      DropdownView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
      @view = new DropdownView
        el: $ "<div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
        facets: ['price_range', 'dimension_range', 'medium']
        facet: 'price_range'
        filterRoot: '/browse'

      done()

  afterEach ->
    benv.teardown()

  it 'renders properly', ->
    @view.renderCounts @view.collection

    @view.$('.filter-nav-main-text').text().should.equal 'price'
    @view.$('.filter-nav-active-text').text().should.equal ''
    @view.$('.filter-dropdown-nav > a').first().text().should.equal 'All prices'
    @view.$('.filter-dropdown-nav > a:nth-child(2) .filter-dropdown-text').text().should.equal 'Under $1,000'
    @view.$('.filter-dropdown-nav > a:nth-child(2) .filter-dropdown-count').text().should.equal '(535)'

