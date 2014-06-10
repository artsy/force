_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
Artwork = require '../../../../models/artwork'
{ ArtworkCollection } = ArtworkCollections = require '../../../../collections/artwork_collections.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'EditWorkModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        EditWorkModal = benv.requireWithJadeify(
          resolve(__dirname, '../../client/edit_work_modal')
          ['template']
        )
        EditWorkModal::initialize = sinon.stub()
        EditWorkModal::close = sinon.stub()
        @view = new EditWorkModal
          el: $('body')
          collection: new ArtworkCollection(id: 'saved-artwork', user_id: 'craig')
          artwork: new Artwork(fabricate 'artwork')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'inits', ->
      @view.initialize()

  describe '#delete', ->

    it 'removes the artwork', ->
      @view.artwork = new Artwork fabricate 'artwork'
      @view.delete $("<div data-id='cats'></div>")
      _.last(Backbone.sync.args)[2].url.should.include '/saved-artwork/artwork/skull'

  describe '#moveTo'