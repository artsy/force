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
        FilterArtworksNav.__set__ 'mediator', @mediator = trigger: sinon.stub(), on: sinon.stub()
        @view = new FilterArtworksNav
          el: $('.filter-nav')
          params: new Backbone.Model
          counts: new Backbone.Model
        done()

  afterEach ->
    benv.teardown()

  it 'renders counts', ->
    @view.counts.set {
      price_range: { "-1:1000": 51 }
      dimension: { "24": 38 }
    }
    @view.renderCounts()
    @view.$el.html().should.include '51'
    @view.$el.html().should.include '38'

  it 'limits counts to the top 10', ->
    @view.counts.clear()
    @view.counts.set {
      dimension:
        "a": 11
        "b": 21
        "c": 31
        "d": 41
        "e": 51
        "f": 61
        "g": 71
        "h": 81
        "i": 91
        "j": 101
        "k": 115
        "l": 121
    }
    @view.renderCounts()
    @view.$el.html().should.not.include '11'

  it 'renders without errors', ->
    @view.$el.html().should.not.include 'undefined'
