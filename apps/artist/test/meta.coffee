fs = require 'graceful-fs'
jade = require 'jade'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->

  before ->
    @file = "#{process.cwd()}/apps/artist/templates/meta.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'

  describe 'basic artist with name and short blurb', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.containEql "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@artist.toPageDescription(155).replace('&', '&amp;')}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Pablo Picasso - Explore their Artworks, Biography"

  describe 'artist with name no blurb, nationality, or years', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @artist.set
        nationality: null
        blurb: null
        years: null
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd

    it 'renders correctly', ->
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@artist.toPageDescription().replace('&', '&amp;')}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Pablo Picasso - Explore their Artworks, Biography"

  describe 'with an image', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @artist.set image_versions: ["large"]
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"/foo/bar/large"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
