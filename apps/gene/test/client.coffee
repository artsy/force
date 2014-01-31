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
    { GeneView } = mod = benv.require '../client/index.coffee'
    mod.__set__ 'mediator', @mediator = { trigger: sinon.stub() }
    @view = new GeneView el: $('body')

  describe '#initialize', ->

    it 'sets up a share view', ->
      @view.shareView.$el.attr('id').should.equal 'gene-share-buttons'

  describe '#signupToFollow', ->

    it 'opens the auth modal', ->
      @view.signupToFollow()
      @mediator.trigger.args[0][0].should.equal 'open:auth'
      @mediator.trigger.args[0][1].mode.should.equal 'register'