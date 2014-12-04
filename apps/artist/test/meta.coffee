fs = require 'graceful-fs'
jade = require 'jade'
sinon = require 'sinon'
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
      @artist = new Artist fabricate 'artist', id: 'pablo-picasso'
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd
        nav: rels: sinon.stub().returns {
          next: href: "/artist/#{@artist.id}/shows"
          prev: href: "/artist/#{@artist.id}/works"
        }

    it 'includes mobile alternate, canonical, twitter card, og tags, next/prev links', ->
      @html.should.containEql "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artist/pablo-picasso"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@artist.toPageDescription(155).replace('&', '&amp;')}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Pablo Picasso - Explore their Artworks, Biography"
      @html.should.containEql "<link rel=\"next\" href=\"http://localhost:5000/artist/pablo-picasso/shows\""
      @html.should.containEql "<link rel=\"prev\" href=\"http://localhost:5000/artist/pablo-picasso/works\""

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
        nav: rels: sinon.stub().returns {}

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
        nav: rels: sinon.stub().returns {}

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"/foo/bar/large"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
