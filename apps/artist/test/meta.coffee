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
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@artist.toPageDescription(155)}"
      @html.should.containEql "<meta property=\"og:title\" content=\"Pablo Picasso | Artist Biography, Artwork for Sale | Artsy"

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
      @html.should.containEql "<meta property=\"og:description\" content=\"Find the latest shows, biography, and artworks for sale by Pablo Picasso"
      @html.should.containEql "<meta property=\"og:title\" content=\"Pablo Picasso | Artist Biography, Artwork for Sale | Artsy"

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

  describe 'with a long blurb', ->

    beforeEach ->
      @artist = new Artist fabricate 'artist'
      @artist.set blurb: "Obsessed with celebrity, consumer culture, and mechanical (re)production, Pop artist Andy Warhol created some of the most iconic images of the 20th century. As famous for his quips as for his art—he variously mused that “art is what you can get away with” and “everyone will be famous for 15 minutes”—Warhol drew widely from popular culture and everyday subject matter, creating works like his 32 Campbell's Soup Cans (1962), Brillo pad box sculptures, and portraits of Marilyn Monroe, using the medium of silk-screen."
      @html = jade.render fs.readFileSync(@file).toString(),
        artist: @artist
        sd: @sd

    it 'renders short blurb for facebook and long one for twitter', ->
      @html.should.containEql "og:description\" content=\"Find the latest shows, biography, and artworks for sale by Pablo Picasso. Obsessed with celebrity, consumer culture, and mechanical (re)production, Pop..."
      @html.should.containEql "<meta property=\"twitter:description\" content=\"Find the latest shows, biography, and artworks for sale by Pablo Picasso. Obsessed with celebrity, consumer culture, and mechanical (re)production, Pop artist Andy Warhol created some of the most..."
