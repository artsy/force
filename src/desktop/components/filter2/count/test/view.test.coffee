_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate2 } = require '@artsy/antigravity'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'

describe 'Filter / Count', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      CountView = benv.require resolve(__dirname, '../view')
      @view = new CountView
        el: $ "<div><div class='filter-sort-count-total'></div></div>"
        params: new Backbone.Model
        collection: new FilterArtworks fabricate2('filter_artworks'), parse: true
        facets: ['price_range', 'dimension_range', 'medium']

      done()

  afterEach ->
    benv.teardown()

  it 'renders the counts', ->
    @view.updateCounts()
    @view.$el.html().should.containEql '12,958'

  it 'renders singulars like a bawse', ->
    @view.collection.counts.total.value = 1
    @view.updateCounts()
    @view.$el.html().should.not.containEql 'Works'
