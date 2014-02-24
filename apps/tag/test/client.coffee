_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Tag = require '../../../models/tag'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'TagView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../index.jade'), {
        sd: {}
        tag: new Tag fabricate 'tag'
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()


  beforeEach ->
    { TagView } = mod = benv.require resolve(__dirname, '../client.coffee')
    mod.__set__ 'FilterArtworksView', class @FilterArtworksView
      constructor: (opts) -> _.extend @, opts
      reset: sinon.stub()
    sinon.stub Backbone, 'sync'
    @view = new TagView
      el: $('body')
      model: new Tag fabricate 'tag'

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'starts the filter artworks view', ->
      @FilterArtworksView::reset.called.should.be.ok

    it 'passes in the tag urlRoot', ->
      @view.initialize()
      @view.filterView.urlRoot.should.match /// tag/.* ///