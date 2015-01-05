_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'FilterArtworksNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      benv.render resolve(__dirname, '../template.jade'), { sd: {}, filterRoot: '/browse/artworks' }, =>
        FilterArtworksNav = benv.require resolve(__dirname, '../view')
        @view = new FilterArtworksNav
          el: $('.filter-nav')
          params: new Backbone.Model
          counts: new Backbone.Model
        done()

  afterEach ->
    benv.teardown()

  it 'renders counts', ->
    @view.counts.set
      price_range: '-1:1000000000000': name: '-1:1000000000000', count: 51
      dimension: '24': name: '24', count: 38
    @view.renderCounts()
    @view.$el.html().should.containEql '(51)'
    @view.$el.html().should.containEql '(38)'

  it 'renders without errors', ->
    @view.$el.html().should.not.containEql 'undefined'
