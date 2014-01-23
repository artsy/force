_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
OrderedSets    = require '../../../collections/ordered_sets.coffee'
Gene = require '../../../models/gene'
Genes = require '../../../collections/genes'
{ resolve } = require 'path'
RecommendedGenesView = mod = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'RecommendedGenesView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      $.fn.fillwidth = ->
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->

    sinon.stub Backbone, 'sync'
    @OrderedSets = sinon.stub()
    @OrderedSets.fetch = sinon.stub()
    geneSets = new OrderedSets()
    geneSets.add {id: '123'}
    @OrderedSets.fetch.yieldsTo "success", geneSets
    @OrderedSets.returns @OrderedSets
    mod.__set__ 'OrderedSets', @OrderedSets
    @view = new RecommendedGenesView
      el: $('body')
      numberOfItems: 2
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->

    it 'calls suggested genes api to get suggested genes', ->
      _.last(Backbone.sync.args)[2].url.should.include '/api/v1/set/123/items'

    it 'renders a the exact number of genes', ->
      @view.collection.add fabricate 'gene', image_url: ''
      @view.collection.add fabricate 'gene', image_url: ''
      @view.collection.add fabricate 'gene', image_url: ''
      @view.render()
      @view.$el.find('.recommendation-item').length.should.equal 2
