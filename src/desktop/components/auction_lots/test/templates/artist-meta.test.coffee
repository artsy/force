fs = require 'fs'
jade = require 'jade'
path = require 'path'
Artist = require '../../../../models/artist'
{ fabricate } = require '@artsy/antigravity'

describe 'Meta tags', ->

  before ->
    @file = "#{path.resolve __dirname, '../../'}/templates/meta/artist.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      API_URL: 'http://localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'

  describe 'basic artist with name and short blurb', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:description\" content=\"See details of Pablo Picasso auction results from recent, past, and upcoming sales. Let Artsy be your price guide to Pablo Picasso."
      @html.should.containEql "<meta property=\"og:title\" content=\"Auction Results for Pablo Picasso on Artsy"

  describe 'with an image', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @artist.set image_versions: ["large"]
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        asset: (->)

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
