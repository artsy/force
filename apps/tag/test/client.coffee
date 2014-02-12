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
    mod.__set__ 'FilterArtworksNav', class @FilterArtworksNav
      render: sinon.stub()
    mod.__set__ 'FilterArtworksView', class @FilterSortCount
      render: sinon.stub()
    mod.__set__ 'mediator', @mediator = {
      on: sinon.stub(),
      trigger: sinon.stub()
    }
    sinon.stub Backbone, 'sync'
    @view = new TagView
      el: $('body')
      model: new Tag fabricate 'tag'

  afterEach ->
    Backbone.sync.restore()

  describe '#renderCounts', ->

    it 'fetches the filter suggest and triggers a counts update', ->
      @view.renderCounts()
      _.last(Backbone.sync.args)[2].success { total: 1022 }
      @mediator.trigger.args[0][0].should.equal 'counts'
      @mediator.trigger.args[0][1].should.equal 'Showing 1022 Works'