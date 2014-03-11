benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
rewire = require 'rewire'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'AboutRouter', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      { @init } = mod = rewire '../client.coffee'
      stubChildClasses mod, @,
        ['FilterArtworksView']
        []
      @FilterArtworksView::params = new Backbone.Model
      done()

  afterEach ->
    benv.teardown()

  describe '#init', ->

    it 'creates a filter artworks view initializing it by triggering reset', ->
      @FilterArtworksView::params.on 'reset', spy = sinon.spy()
      @init()
      @FilterArtworksView.args[0][0].artworksUrl.should.include 'filtered/main'
      spy.called.should.be.ok