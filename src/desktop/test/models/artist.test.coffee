_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
Artist = rewire '../../models/artist'


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

      @artist.set published_artworks_count: 2
      @artist.pageTitleArtworksCount().should.equal '2 Artworks'

      @artist.set published_artworks_count: 1
      @artist.pageTitleArtworksCount().should.equal 'Artworks'

      @artist.set published_artworks_count: 0
      @artist.pageTitleArtworksCount().should.equal 'Artworks'

      @artist.set published_artworks_count: undefined
      @artist.pageTitleArtworksCount().should.equal 'Artworks'

    it 'supports a threshold', ->
      @artist.set published_artworks_count: 2
      @artist.pageTitleArtworksCount(2).should.equal 'Artworks'

      @artist.set published_artworks_count: 3
      @artist.pageTitleArtworksCount(2).should.equal '3 Artworks'

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
      _.isUndefined(@artist.displayFollowers()).should.be.true()

  describe '#toAuctionResultsPageTitle', ->
    it 'renders the correct string', ->
      @artist.set id: 'sigmar-polke', name: 'Sigmar Polke'
      @artist.toAuctionResultsPageTitle().should.equal 'Auction Results for Sigmar Polke on Artsy'
      @artist.set id: 'wolfgang-tillmans', name: 'Wolfgang Tillmans'
      @artist.toAuctionResultsPageTitle().should.equal 'Auction Results for Wolfgang Tillmans on Artsy'
      @artist.set id: 'damon-zucconi', name: 'Damon Zucconi'
      @artist.toAuctionResultsPageTitle().should.equal 'Auction Results for Damon Zucconi on Artsy'

  describe '#alternateNames', ->
    it 'concatenates alternate names into a string', ->
      @artist.alternateNames().should.equal ''
      @artistWithAlternateNames = new Artist fabricate 'artist', alternate_names: ['Paul Picasso', 'Paulie Picasso']
      @artistWithAlternateNames.alternateNames().should.equal 'Paul Picasso; Paulie Picasso'
