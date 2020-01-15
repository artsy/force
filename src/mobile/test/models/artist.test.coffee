sinon = require 'sinon'
Backbone = require 'backbone'
Artist = require '../../models/artist'
{ fabricate } = require '@artsy/antigravity'

describe 'Artist', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artist = new Artist fabricate 'artist'

  afterEach ->
    Backbone.sync.restore()

  describe '#imageUrl', ->

    it 'returns the replaced image url', ->
      @artist.set image_url: 'foo/bar/:version.jpg'
      @artist.imageUrl().should.equal 'foo/bar/medium.jpg'

  describe '#maybeFetchAndSetFeaturedBio', ->

    it 'calls the callback and doesnt change the blurb if there is a blurb', ->
      @artist.set(blurb: 'original blurb')
      cb = sinon.stub()
      @artist.maybeFetchAndSetFeaturedBio cb
      Backbone.sync.args.length.should.equal 0
      @artist.get('blurb').should.equal 'original blurb'
      cb.called.should.be.ok()

    it 'sets the featured partner bio and calls the callback if there is no blurb', ->
      @artist.unset 'blurb'
      cb = sinon.stub()
      @artist.maybeFetchAndSetFeaturedBio cb
      Backbone.sync.args[0][2].success [{ biography: 'featured blurb' }]
      Backbone.sync.args[0][1].url.should.containEql 'partner_artists?size=1&featured=true'
      cb.called.should.be.ok()
      @artist.get('blurb').should.equal 'featured blurb'

  describe '#fetchArtworks', ->

    it 'fetches the artists artworks', (done) ->
      @artist.fetchArtworks success: (artworks) ->
        artworks.first().get('title').should.equal 'Arrghwork'
        done()
      Backbone.sync.args[0][2].success [fabricate 'artwork', title: 'Arrghwork']
      Backbone.sync.args[0][1].url.should.match /// /api/v1/artist/.*/artworks ///

  describe '#fetchRelatedArtists', ->

    it 'fetches the related artists', (done) ->
      @artist.fetchRelatedArtists success: (artists) ->
        artists.first().get('name').should.equal "Andy Bazqux"
        done()
      Backbone.sync.args[0][2].success [fabricate 'artist', name: 'Andy Bazqux']
      Backbone.sync.args[0][1].url.should.containEql 'layer/main/artists'

  describe '#defaultImageUrl', ->

    it 'defaults to tall if the image version exists', ->
      @artist.set image_url: 'cat/bitty/:version.jpg'
      @artist.set image_versions: [ 'tall', 'other' ]
      @artist.defaultImageUrl().should.equal 'cat/bitty/tall.jpg'

    it 'falls back to four_thirds (partner artist) if tall version not present', ->
      @artist.set image_url: 'cat/bitty/:version.jpg'
      @artist.set image_versions: [ 'four_thirds', 'other' ]
      @artist.defaultImageUrl().should.equal 'cat/bitty/four_thirds.jpg'

  describe '#fetchFilteredArtworks', ->

    it 'fetches the filtered artists artworks', (done) ->
      @artist.fetchFilteredArtworks
        data: { sort: 'title' } ,
        success: (artworks) ->
          artworks.first().get('title').should.equal 'Blahwork'
          done()
      Backbone.sync.args[0][2].success hits: [fabricate('artwork', title: 'Blahwork')]
      Backbone.sync.args[0][1].url.should.match /// /api/v1/filter/artworks ///
      Backbone.sync.args[0][2].data.should.equal 'sort=title'
