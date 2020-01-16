_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../models/current_user'
ArtworkCollections = require '../../collections/artwork_collections'
Artwork = require '../../models/artwork'
{ fabricate } = require '@artsy/antigravity'

describe 'ArtworkCollections', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'
    @collections = new ArtworkCollections [], user: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets the artworks and url when adding a collection', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().url().should.containEql '/api/v1/collection/saved-artwork?user_id=' + @user.id
      @collections.first().artworks.url.should.containEql '/api/v1/collection/saved-artwork/artworks'

    it 'triggers {event}:artwork when a collection artwork is acted on', ->
      for e in ['destroy', 'remove', 'add']
        @collections.on e + ':artwork', spy = sinon.spy()
        @collections.add { id: 'saved-artwork' }
        @collections.first().artworks.add fabricate 'artwork'
        @collections.first().artworks.first().destroy()
        spy.called.should.be.ok()

    it 'fetches artworks by recently saved', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().artworks.url.should.containEql 'sort=-position'

  describe '#saveArtwork', ->

    it 'saves the artwork to the collection', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().saveArtwork new Artwork id: 'foo-bar'
      Backbone.sync.args[0][2].url.should
        .containEql '/api/v1/collection/saved-artwork/artwork/foo-bar?user_id=' + @user.id

    it 'adds the artwork to the collections artworks', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().saveArtwork new Artwork id: 'foo-bar'
      @collections.first().artworks.first().get('id').should.equal 'foo-bar'

    it 'adds the artwork at the beginning', ->
      @collections.add { id: 'saved-artwork' }
      @collections.first().artworks.reset [fabricate('artwork'), fabricate('artwork'), fabricate('artwork')]
      @collections.first().saveArtwork new Artwork id: 'foo-bar'
      @collections.first().artworks.first().get('id').should.equal 'foo-bar'

  describe 'comparator', ->

    it 'orders the saved-artwork first', ->
      @collections.reset [{ id: 'foo' }, { id: 'bar' }, { id: 'saved-artwork'}, { id: 'baz' }]
      @collections.first().get('id').should.equal 'saved-artwork'

  describe '#fetchNextArtworksPage', ->

    it 'spawns out fetches for each collections artworks', (done) ->
      @collections.reset [{ id: 'saved-artwork' }, { id: 'cat-portraits' }]
      @collections.fetchNextArtworksPage success: (artworks) ->
        _.pluck(artworks, 'id').join('').should.equal 'foobar'
        done()
      Backbone.sync.args[0][2].success [fabricate 'artwork', id: 'foo']
      Backbone.sync.args[0][2].complete()
      Backbone.sync.args[1][2].success [fabricate 'artwork', id: 'bar']
      Backbone.sync.args[1][2].complete()

    it 'triggers end event when theres no more pages', (done) ->
      @collections.reset [{ id: 'saved-artwork' }, { id: 'cat-portraits' }]
      @collections.on 'end:artworks', done
      @collections.fetchNextArtworksPage()
      Backbone.sync.args[0][2].success []
      Backbone.sync.args[0][2].complete()
      Backbone.sync.args[1][2].success []
      Backbone.sync.args[1][2].complete()

  describe '#get', ->

    it 'changes saved-artwork to My Favorite Works', ->
      @collections.add { id: 'saved-artwork', name: "Saved Artwork" }
      @collections.first().get('name').should.equal 'My Favorite Works'

  describe '#injectArtwork', ->

    it 'checks where an artwork exists and injects it into the collections', ->
      @collections.reset [{ id: 'foos-for-my-bar' }, { id: 'saved-artwork' }]
      @collections.injectArtwork(
        new Backbone.Model(fabricate 'artwork', id: 'andy-foobar-skull')
        {}
      )
      _.last(Backbone.sync.args)[2].success [{ id: 'foos-for-my-bar' }]
      (@collections.get('foos-for-my-bar').artworks.get('andy-foobar-skull')?).should.be.ok()

  describe '#public', ->

    it 'checks wheter all collections are public/private'

  describe '#togglePrivacy', ->

    it 'toggles every collections privacy setting'
