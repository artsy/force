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
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        FilterArtworksNav = benv.require resolve(__dirname, '../view')
        FilterArtworksNav.__set__ 'mediator', @mediator = trigger: sinon.stub(), on: sinon.stub()
        @view = new FilterArtworksNav el: $('.filter-nav')
        done()

  afterEach ->
    benv.teardown()

  it 'triggers filter events', ->
    @view.filterPrice target: $ "<div data-range='-1:1000'></div>"
    @mediator.trigger.args[0][0].should.equal 'filter'
    @mediator.trigger.args[0][1].price_range.should.equal '-1:1000'

  it 'renders counts', ->
    @view.renderCounts {
      price_range: { "-1:1000000000000": 51 }
      dimension: { "24": 38 }
    }
    @view.$el.html().should.include '51'
    @view.$el.html().should.include '38'