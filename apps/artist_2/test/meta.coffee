fs = require 'fs'
jade = require 'jade'
sinon = require 'sinon'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
artistJSON = require './fixtures'
helpers = require '../view_helpers'
_ = require 'underscore'

describe 'Meta tags', ->
  before ->
    @file = "#{process.cwd()}/apps/artist_2/templates/meta.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'

  describe 'basic artist with name and short blurb', ->
    beforeEach ->
      @artist = _.pick artistJSON, '_id', 'id', 'name', 'gender', 'blurb', 'stastuses', 'counts'
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        viewHelpers: helpers
        nav: rels: sinon.stub().returns {
          next: href: "/artist/#{@artist.id}/shows"
          prev: href: "/artist/#{@artist.id}/works"
        }

    it 'includes mobile alternate, canonical, twitter card, og tags, next/prev links', ->
      @html.should.containEql "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artist/jeff-koons-1"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{helpers.pageDescription(@artist, 155).replace('&', '&amp;')}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Jeff Koons - 185 Artworks, Bio"
      @html.should.containEql "<link rel=\"next\" href=\"http://localhost:5000/artist/jeff-koons-1/shows\""
      @html.should.containEql "<link rel=\"prev\" href=\"http://localhost:5000/artist/jeff-koons-1/works\""

  describe 'artist with name no blurb, nationality, or years', ->
    beforeEach ->
      @artist = _.extend nationality: null, blurb: null, years: null, artistJSON

      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: rels: sinon.stub().returns {}
        viewHelpers: helpers

    it 'renders correctly', ->
      @html.should.containEql "<meta property=\"og:description\" content=\"#{helpers.pageDescription(@artist).replace('&', '&amp;')}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Jeff Koons - 185 Artworks, Bio"

  describe 'with an image', ->
    beforeEach ->
      @artist = artistJSON
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: rels: sinon.stub().returns {}
        viewHelpers: helpers

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"/foo/bar/large.jpg"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
