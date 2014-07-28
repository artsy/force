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
      { @index } = mod = rewire '../client.coffee'
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
      @index()
      @FilterArtworksView.args[0][0].artworksUrl.should.containEql 'filtered/main'
      spy.called.should.be.ok
