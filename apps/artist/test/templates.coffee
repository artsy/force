jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Artist          = require '../../../models/artist'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artist header', ->
  describe 'artist with some artworks', ->
    beforeEach ->
      @artist     = new Artist fabricate 'artist', { published_artworks_count: 1 }
      @template   = render('index')(
        sd: {}
        artist: @artist
      )

    it 'should not display the no works message if there is more than 0 artworks', ->
      @artist.get('published_artworks_count').should.be.above 0
      @template.should.not.include "There are no #{@artist.get('name')} on Artsy yet."

  describe 'artist with some artworks (on the overview page)', ->
    beforeEach ->
      @artist     = new Artist fabricate 'artist', { published_artworks_count: 0 }
      @template   = render('index')(
        sd: { CURRENT_PATH: "/artist/#{@artist.id}" }
        artist: @artist
      )

    it 'should display the no works message if there is 0 artworks', ->
      @artist.get('published_artworks_count').should.equal 0
      @template.should.include "There are no #{@artist.get('name')} works on Artsy yet."

  describe 'Auction results page for artist with some artworks', ->
    beforeEach ->
      @artist     = new Artist fabricate 'artist', { published_artworks_count: 0 }
      @template   = render('index')(
        sd: { CURRENT_PATH: "/artist/#{@artist.id}/auction-results" }
        artist: @artist
      )

    it 'should *not* display the no works message if there is 0 artworks and we are not on the overview page', ->
      @artist.get('published_artworks_count').should.equal 0
      @template.should.not.include "There are no #{@artist.get('name')} works on Artsy yet."

  describe 'artist with auction results', ->
    beforeEach ->
      @artist     = new Artist fabricate 'artist', { published_artworks_count: 1, auction_lots_count: 1 }
      @template   = render('index')(
        sd: {}
        artist: @artist
      )

    it 'displays a link to the auction results', ->
      @artist.get('published_artworks_count').should.be.above 0
      @artist.get('auction_lots_count').should.be.above 0
      @template.should.include 'artist-auction-results-link'

  describe 'artist with no auction results', ->
    beforeEach ->
      @artist     = new Artist fabricate 'artist', { published_artworks_count: 1, auction_lots_count: 0 }
      @template   = render('index')(
        sd: {}
        artist: @artist
      )

    it 'does not display a link to the auction results', ->
      @artist.get('auction_lots_count').should.equal 0
      @artist.get('published_artworks_count').should.be.above 0
      @template.should.not.include 'artist-auction-results-link'
