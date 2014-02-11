_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

# This view has templates, need to require with Jadeify
FilterArtworksNav = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'FilterArtworksNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterArtworksNav.__set__ 'mediator', @mediator = trigger: sinon.stub()
      @view = new FilterArtworksNav el: $ "<div></div>"
      done()

  afterEach ->
    benv.teardown()

  it 'renders medium if passed', ->
    @view.filterOptions = medium: { "Finger Painting": 'finger-painting' }
    @view.render()
    @view.$el.html().should.include 'Finger Painting'

  it 'triggers filter events', ->
    @view.filterPrice target: $ "<div data-range='-1:1000'></div>"
    @mediator.trigger.args[0][0].should.equal 'filter'
    @mediator.trigger.args[0][1].price_range.should.equal '-1:1000'