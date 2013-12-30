fs            = require 'fs'
jade          = require 'jade'
Artist        = require '../../../models/artist'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->

  before ->
    @file = "#{process.cwd()}/apps/auction_lots/templates/artist-meta.jade"
    @sd =
      ARTSY_URL: 'http://localhost:5000'
      CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'

  describe 'basic artist with name and short blurb', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd    : @sd

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.include "<meta property=\"og:url\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.include "<meta property=\"og:description\" content=\"Auction Results for Pablo Picasso"
      @html.should.include "<meta property=\"og:title\" content=\"Auction Results for Pablo Picasso"

  describe 'with an image', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @artist.set image_versions: ["large"]
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd    : @sd

    it 'includes og:image and twitter card', ->
      @html.should.include "<meta property=\"og:image\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.include "<meta property=\"twitter:card\" content=\"summary_large_image"
