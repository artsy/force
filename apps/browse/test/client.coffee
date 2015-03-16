benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ stubChildClasses } = require '../../../test/helpers/stubs'

describe 'Browse', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      { @init } = mod = rewire '../client.coffee'
      sinon.stub Backbone.history, 'start'
      stubChildClasses mod, @,
        ['FilterArtworksView', 'scrollFrame']
        []
      @FilterArtworksView::params = new Backbone.Model
      done()

  afterEach ->
    Backbone.history.start.restore()
    benv.teardown()

  describe '#index', ->
    it 'creates a filter artworks view initializing it by triggering reset', ->
      @FilterArtworksView::params.on 'reset', spy = sinon.spy()
      @init()
      @FilterArtworksView.args[0][0].artworksUrl.should.containEql 'filtered/main'
      spy.called.should.be.ok
