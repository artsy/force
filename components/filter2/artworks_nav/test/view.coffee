_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
FilterArtworks = require '../../../../collections/filter_artworks.coffee'
{ resolve } = require 'path'
{ fabricate2 } = require 'antigravity'

describe 'FilterArtworksNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require('jquery'), sd: {} }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      FilterArtworksNav = benv.requireWithJadeify resolve(__dirname, '../view'), ['filterTemplate']
      collection = new FilterArtworks fabricate2('filter_artworks'), parse: true
      @view = new FilterArtworksNav
        $el: $('.filter-nav')
        params: new Backbone.Model
        collection: collection
      done()

  afterEach ->
    benv.teardown()

  it 'renders counts', ->
    @view.renderFilter()
    @view.$("a[data-val='48.0-84.0']").html().should.containEql '(3181)'
    @view.$("a[data-val='84.0-*']").html().should.containEql '(4985)'

  it 'renders without errors', ->
    @view.$el.html().should.not.containEql 'undefined'