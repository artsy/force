_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
{ ArtworkCollection } = ArtworkCollections = require '../../../../collections/artwork_collections.coffee'

describe 'CollectionList', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      user = new CurrentUser id: 'craig'
      collections = new ArtworkCollections [{ id: 'cat-portraits' }], { user: user }
      artwork = new Backbone.Model fabricate 'artwork'
      benv.render resolve(__dirname, '../../templates/collection_list.jade'), {
        sd: {}
        collections: collections.models
        artwork: artwork
      }, =>
        CollectionList = benv.require resolve(__dirname, '../../client/collection_list')
        @view = new CollectionList
          el: $('body')
          user: user
          collections: collections
          artwork: artwork
          collection: new ArtworkCollection { id: 'saved-artwork' }, user_id: user
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#removeArtwork', ->

    it 'removes it from the current set', ->
      @view.removeArtwork { currentTarget: $('li').first() }
      Backbone.sync.args[0][0].should.equal 'delete'
      Backbone.sync.args[0][2].url.should.include '/collection/cat-portraits/artwork'

  describe '#addArtwork', ->

    it 'adds it to the set', ->
      @view.addArtwork { currentTarget: $('li').first() }
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][2].url.should.include '/collection/cat-portraits/artwork'

  describe '#newCollection', ->

    it 'creates a new collection and moved the artwork to it', ->
      @view.$('button').attr('disabled', null)
      @view.$('.favorites2-collection-list-create input').val('Foo Bar')
      @view.newCollection(preventDefault: ->)
      _.last(Backbone.sync.args)[0].should.equal 'create'
      _.last(Backbone.sync.args)[2].url.should

    it 'does not create a collection if the button is disabled', ->
      @view.newCollection(preventDefault: ->)
      Backbone.sync.called.should.not.be.ok