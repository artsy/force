benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Gene = require '../../../models/gene'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'GeneView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: {}
        gene: new Gene fabricate 'gene'
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    { GeneView } = mod = benv.require resolve __dirname, '../client/index.coffee'
    mod.__set__ 'mediator', @mediator = { trigger: sinon.stub() }
    @view = new GeneView el: $('body'), model: new Gene fabricate 'gene'

  describe '#initialize', ->

    it 'sets up a share view', ->
      @view.shareView.$el.attr('id').should.equal 'gene-share-buttons'