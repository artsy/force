_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
OrderedSets = require '../../../collections/ordered_sets.coffee'
Gene = require '../../../models/gene'
Genes = require '../../../collections/genes'
{ resolve } = require 'path'
SuggestedGenesView = mod = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'SuggestedGenesView', ->

  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    mod.__set__ 'OrderedSets', Backbone.Collection
    @view = new SuggestedGenesView
      el: $('body')
      numberOfItems: 2
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->

    it 'calls suggested genes api to get suggested genes', ->
      _.last(Backbone.sync.args)[2].success { id: '123' }
      _.last(Backbone.sync.args)[2].url.should.containEql '/api/v1/set/123/items'

    it 'renders the exact number of genes', ->
      @view.collection.add fabricate 'gene', image_url: ''
      @view.collection.add fabricate 'gene', image_url: ''
      @view.collection.add fabricate 'gene', image_url: ''
      @view.collection.add fabricate 'gene', image_url: ''
      @view.render()
      @view.$el.find('.suggestion-item').length.should.equal 2
