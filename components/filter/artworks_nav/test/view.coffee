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
      benv.render resolve(__dirname, '../template.jade'), {}, =>
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