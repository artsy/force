_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
{ ArtworkCollection } = ArtworkCollections = require '../../../../collections/artwork_collections.coffee'

describe 'RemoveConfirmModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        RemoveConfirmModal = benv.requireWithJadeify(
          resolve(__dirname, '../../client/remove_confirm_modal')
          ['template']
        )
        RemoveConfirmModal::initialize = sinon.stub()
        RemoveConfirmModal::close = sinon.stub()
        @view = new RemoveConfirmModal el: $('body')
        @view.collection = new ArtworkCollection id: 'saved-artwork', user_id: 'foo'
        @view.artwork = new Backbone.Model id: 'andy-foobar-skull'
        @view.collection.initArtworks()
        @view.collection.artworks.add @view.artwork
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#delete', ->

    it 'destroys the collection', ->
      @view.delete()
      _.last(Backbone.sync.args)[2].url.should.include(
        'collection/saved-artwork/artwork/andy-foobar-skull'
      )
      _.last(Backbone.sync.args)[0].should.equal 'delete'