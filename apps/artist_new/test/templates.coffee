jade = require 'jade'
fs = require 'fs'
_s = require 'underscore.string'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate, fabricate2 } = require 'antigravity'
Artist = require '../../../models/artist'
FilterArtworks = require '../../../collections/filter_artworks'
Nav = require '../nav'
Carousel = require '../carousel'

describe 'Artist header', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  describe 'artist with some artworks', ->
    before (done) ->
      @artist = new Artist fabricate 'artist', published_artworks_count: 1
      @carousel = new Carousel artist: @artist
      @nav = new Nav artist: @artist, statuses:
        artworks: true
        shows: true
        articles: false
        artists: false
        contemporary: true

      @filterArtworks = new FilterArtworks fabricate2('filter_artworks'), { parse: true }

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        carousel: @carousel
        filterRoot: '/artist'
        counts: @filterArtworks.counts
        activeText: ''
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      }, done

    it 'should not display the no works message if there is more than 0 artworks', ->
      @artist.get('published_artworks_count').should.be.above 0
      $('body').html().should.not.containEql "There are no #{@artist.get('name')} on Artsy yet."

    it 'should not display an auction results link', ->
      $('body').html().should.not.containEql 'artist-auction-results-link'

    it 'renders the appropriate nav', ->
      $navLinks = $('#artist-nav-list a')
      $navLinks.length.should.equal 4
      $navLinks.first().text().should.equal 'Overview'
      $navLinks.last().text().should.equal 'Related Artists'

  describe 'artist with some artworks (on the overview page)', ->
    beforeEach (done) ->
      @artist = new Artist fabricate 'artist', published_artworks_count: 0
      @carousel = new Carousel artist: @artist
      @nav = new Nav artist: @artist, statuses:
        artworks: false
        shows: true
        articles: false
        artists: false
        contemporary: false

      @filterArtworks = new FilterArtworks fabricate2('filter_artworks'), { parse: true }

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        carousel: @carousel
        filterRoot: '/artist'
        counts: @filterArtworks.counts
        activeText: ''
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      }, done

    # pending until there is an empty state
    xit 'should display the no works message if there is 0 artworks', ->
      @artist.get('published_artworks_count').should.equal 0
      $('body').html().should.containEql "There are no #{@artist.get('name')} works on Artsy yet."

    it 'renders the appropriate nav', ->
      $navLinks = $('#artist-nav-list a')
      $navLinks.length.should.equal 2
      $navLinks.first().text().should.equal 'Overview'
      $navLinks.last().text().should.equal 'Shows'
      $navLinks.text().should.not.containEql 'Works'

  describe 'artist with auction results', ->
    beforeEach (done) ->
      @artist = new Artist fabricate 'artist', published_artworks_count: 1, auction_lots_count: 1
      @carousel = new Carousel artist: @artist
      @nav = new Nav artist: @artist, statuses:
        artworks: false
        shows: true
        articles: false
        artists: false
        contemporary: false

      @filterArtworks = new FilterArtworks fabricate2('filter_artworks'), { parse: true }

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        asset: (->)
        artist: @artist
        nav: @nav
        carousel: @carousel
        filterRoot: '/artist'
        counts: @filterArtworks.counts
        activeText: ''
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      }, done

    it 'displays a link to the auction results', ->
      @artist.get('published_artworks_count').should.be.above 0
      @artist.get('auction_lots_count').should.be.above 0
      $('body').html().should.containEql "/artist/#{@artist.id}/auction-results"
