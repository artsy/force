_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Artist = require '../../models/artist'
{ fabricate } = require 'antigravity'

describe 'Artist', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artist = new Artist fabricate 'artist'

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up related artist collections', ->
      @artist.related().artists.url.should.containEql '/api/v1/related/layer/main/artists'
      @artist.related().contemporary.url.should.containEql '/api/v1/related/layer/contemporary'

  describe '#fetchRelatedArtists', ->

    it 'fetches one of its related artist collections with sensible default params', ->
      @artist.fetchRelatedArtists 'Contemporary'
      _.last(Backbone.sync.args)[1].url.should.containEql 'layer/contemporary'
      _.last(Backbone.sync.args)[2].data.size.should.equal 5

  describe '#fetchArtworks', ->

    it 'fetches the artists artworks and adds published=true', ->
      @artist.fetchArtworks()
      _.last(Backbone.sync.args)[1].url.should.containEql "artist/#{@artist.get 'id'}/artworks?published=true"

    it 'fetches the artists artworks and adds published=true', ->
      @artist.fetchArtworks({ success: sinon.stub() })
      _.last(Backbone.sync.args)[1].url.should.containEql "artist/#{@artist.get 'id'}/artworks?published=true"

  describe '#displayAvailableWorks', ->
    it 'returns a string describing the number of available and reference works', ->
      @artist.set published_artworks_count: 2, forsale_artworks_count: 1
      @artist.displayAvailableWorks().should.equal '1 available work & 1 reference work'
      @artist.set published_artworks_count: 4, forsale_artworks_count: 2
      @artist.displayAvailableWorks().should.equal '2 available works & 2 reference works'
      @artist.set published_artworks_count: 400, forsale_artworks_count: 125
      @artist.displayAvailableWorks().should.equal '125 available works & 275 reference works'
      @artist.set published_artworks_count: 2, forsale_artworks_count: 0
      @artist.displayAvailableWorks().should.equal '2 reference works'
      @artist.set published_artworks_count: 2, forsale_artworks_count: 2
      @artist.displayAvailableWorks().should.equal '2 available works'

  describe '#toJSONLD', ->

    it 'returns valid json', ->
      json = @artist.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'Person'
      json.name.should.equal 'Pablo Picasso'

  describe '#toJSONLDShort', ->

    it 'returns valid json', ->
      json = @artist.toJSONLDShort()
      json['@type'].should.equal 'Person'
      json.name.should.equal 'Pablo Picasso'
      json.sameAs.should.containEql 'artist/pablo-picasso'

  describe '#pageTitleArtworksCount', ->

    it 'formats count correctly for various artworks sizes', ->
      @artist.set published_artworks_count: 1001
      @artist.pageTitleArtworksCount().should.equal '1001 Artworks'

      @artist.set published_artworks_count: 101
      @artist.pageTitleArtworksCount().should.equal '101 Artworks'

      @artist.set published_artworks_count: undefined
      @artist.pageTitleArtworksCount().should.equal 'Artworks'

  describe '#displayNationalityAndBirthdate', ->
    it 'renders the correct string', ->
      @artist.set nationality: 'American', years: 'born 1955'
      @artist.displayNationalityAndBirthdate().should.equal 'American, born 1955'
      @artist.unset 'nationality'
      @artist.displayNationalityAndBirthdate().should.equal 'born 1955'
      @artist.unset 'years'
      @artist.displayNationalityAndBirthdate().should.be.empty

  describe '#displayFollowers', ->
    it 'renders the correct string', ->
      @artist.set 'follow_count', 1
      @artist.displayFollowers().should.equal '1 Follower'
      @artist.set 'follow_count', 1000
      @artist.displayFollowers().should.equal '1,000 Followers'
      @artist.unset 'follow_count'
      _.isUndefined(@artist.displayFollowers()).should.be.true

  describe '#toPageTitle', ->
    it 'renders the correct string for artists a-h', ->
      @artist.set(id: 'abc').toPageTitle().should.equal 'Pablo Picasso | Artworks, Artist Biography | Artsy'

    it 'renders the correct string for artists not in a-h', ->
      @artist.set(id: 'zerg', gender: 'is a social construct', name: 'Zerg').toPageTitle().should.equal 'Zerg - Explore their Artworks, Biography & Shows on Artsy'
      @artist.set(id: 'zerg', gender: 'male', name: 'Zerg').toPageTitle().should.equal 'Zerg - Explore his Artworks, Biography & Shows on Artsy'
      @artist.set(id: 'zerg', gender: 'female', name: 'Zerg').toPageTitle().should.equal 'Zerg - Explore her Artworks, Biography & Shows on Artsy'

    it 'supports a custom override', ->
      @artist.set(id: 'test-artist')
      @artist.toPageTitle().should.equal 'Test Artist title'

  describe '#toPageDescription', ->
    it 'renders the correct string for artists a-h', ->
      @artist.set(id: 'abc').toPageDescription().should.containEql 'Find the latest shows, biography, and artworks for sale by Pablo Picasso. This is Pablo Picasso'

    it 'renders the correct string for artists not in a-h', ->
      @artist.set(id: 'zerg', gender: 'is a social construct', name: 'Zerg').toPageDescription().should.equal 'Browse the best of Zerg, including artwork for sale, their latest shows & events, biography, and exclusive Zerg articles.'
      @artist.set(id: 'zerg', gender: 'male', name: 'Zerg').toPageDescription().should.equal 'Browse the best of Zerg, including artwork for sale, his latest shows & events, biography, and exclusive Zerg articles.'
      @artist.set(id: 'zerg', gender: 'female', name: 'Zerg').toPageDescription().should.equal 'Browse the best of Zerg, including artwork for sale, her latest shows & events, biography, and exclusive Zerg articles.'

    it 'supports a custom override', ->
      @artist.set(id: 'test-artist')
      @artist.toPageDescription().should.equal 'Test Artist description'
