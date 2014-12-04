jade = require 'jade'
fs = require 'graceful-fs'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Nav = require '../nav'

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
      @nav = new Nav artist: @artist, statuses:
        artworks: true
        shows: true
        posts: false
        artists: false
        contemporary: true

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        artist: @artist
        nav: @nav
      }, done

    it 'should not display the no works message if there is more than 0 artworks', ->
      @artist.get('published_artworks_count').should.be.above 0
      $('body').html().should.not.containEql "There are no #{@artist.get('name')} on Artsy yet."

    it 'should not display an auction results link', ->
      $('body').html().should.not.containEql 'artist-auction-results-link'

    it 'renders the appropriate nav', ->
      $navLinks = $('.garamond-tablist a')
      $navLinks.length.should.equal 4
      $navLinks.first().text().should.equal 'Overview'
      $navLinks.last().text().should.equal 'Related Artists'
      $navLinks.text().should.not.containEql 'Articles'

  describe 'artist with some artworks (on the overview page)', ->
    beforeEach (done) ->
      @artist = new Artist fabricate 'artist', published_artworks_count: 0
      @nav = new Nav artist: @artist, statuses:
        artworks: false
        shows: true
        posts: false
        artists: false
        contemporary: false

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        artist: @artist
        nav: @nav
      }, done

    it 'should display the no works message if there is 0 artworks', ->
      @artist.get('published_artworks_count').should.equal 0
      $('body').html().should.containEql "There are no #{@artist.get('name')} works on Artsy yet."

    it 'renders the appropriate nav', ->
      $navLinks = $('.garamond-tablist a')
      $navLinks.length.should.equal 2
      $navLinks.first().text().should.equal 'Overview'
      $navLinks.last().text().should.equal 'Shows'
      $navLinks.text().should.not.containEql 'Works'

  describe 'artist with auction results', ->
    beforeEach (done) ->
      @artist = new Artist fabricate 'artist', published_artworks_count: 1, auction_lots_count: 1
      @nav = new Nav artist: @artist, statuses:
        artworks: false
        shows: true
        posts: false
        artists: false
        contemporary: false

      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: CURRENT_PATH: "/artist/#{@artist.id}/shows"
        artist: @artist
        nav: @nav
      }, done

    it 'displays a link to the auction results', ->
      @artist.get('published_artworks_count').should.be.above 0
      @artist.get('auction_lots_count').should.be.above 0
      $('body').html().should.containEql "/artist/#{@artist.id}/auction-results"
