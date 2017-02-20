fs = require 'fs'
jade = require 'jade'
sinon = require 'sinon'
path = require 'path'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
artistJSON = require './fixtures'
helpers = require '../view_helpers'
Nav = require '../nav'
_ = require 'underscore'

describe 'Meta tags', ->
  before ->
    @file = "#{path.resolve __dirname, '../'}/templates/meta.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'
      CURRENT_PATH: '/artist/jeff-koons-1'

  describe 'basic artist with name and short blurb', ->
    beforeEach ->
      @artist = _.pick artistJSON, '_id', 'id', 'name', 'gender', 'blurb', 'stastuses', 'counts', 'meta'
      @artist.statuses = _.clone artistJSON.statuses
      @nav = new Nav artist: @artist
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        viewHelpers: helpers
        nav: @nav

    it 'includes mobile alternate, canonical, twitter card, og tags, next/prev links', ->
      @html.should.containEql "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"og:description\" content=\"Welcome to the official Jeff Koons page on Artsy. Jeff Koons plays with ideas of taste, pleasure, celebrity, and commerce. “I believe in advertisement and media completely” ..."
      @html.should.containEql "<meta property=\"og:title\" content=\"Jeff Koons - 100+ Artworks"
      @html.should.not.containEql "<meta name=\"robots\" content=\"noindex"

  describe 'artist with name no blurb, nationality, or years', ->
    beforeEach ->
      @artist = _.extend nationality: null, blurb: null, years: null, artistJSON
      @artist.statuses = _.clone artistJSON.statuses
      @nav = new Nav artist: @artist
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: @nav
        viewHelpers: helpers

    it 'renders correctly', ->
      @html.should.containEql "<meta property=\"og:description\" content=\"Welcome to the official Jeff Koons page on Artsy. Jeff Koons plays with ideas of taste, pleasure, celebrity, and commerce. “I believe in advertisement and media completely” ..."
      @html.should.containEql "<meta property=\"og:title\" content=\"Jeff Koons - 100+ Artworks"
      @html.should.not.containEql "<meta name=\"robots\" content=\"noindex"

  describe 'with an image', ->
    beforeEach ->
      @artist = artistJSON
      @artist.statuses = _.clone artistJSON.statuses
      @nav = new Nav artist: @artist
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: @nav
        viewHelpers: helpers

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"/foo/bar/large.jpg"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
      @html.should.not.containEql "<meta name=\"robots\" content=\"noindex"

  describe 'with no blurb or artworks', ->
    beforeEach ->
      @artist = _.extend artistJSON, counts: { artworks: 0 }, blurb: null
      @artist.statuses = _.clone artistJSON.statuses
      @nav = new Nav artist: @artist
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: @nav
        viewHelpers: helpers

    it 'should have a noindex, follow tag', ->
      @html.should.containEql "<meta name=\"robots\" content=\"noindex"

  describe 'on the works page (but with artworks)', ->
    beforeEach ->
      @artist = _.extend artistJSON
      @artist.statuses = _.clone artistJSON.statuses
      @nav = new Nav artist: @artist
      @sd.CURRENT_PATH = "/artist/jeff-koons-1/works"
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: rels: sinon.stub().returns {}
        viewHelpers: helpers

    it 'should have a noindex, follow tag', ->
      @html.should.containEql "<meta name=\"robots\" content=\"noindex"
