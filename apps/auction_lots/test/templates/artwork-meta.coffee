fs = require 'graceful-fs'
jade = require 'jade'
Artwork = require '../../../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->

  before ->
    @file = "#{process.cwd()}/apps/auction_lots/templates/meta/artwork.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'

  describe 'basic artwork with name and short blurb', ->

    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @html = jade.render fs.readFileSync(@file).toString(),
        artwork: @artwork
        sd: @sd

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/artwork/#{@artwork.get('id')}"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/artwork/#{@artwork.get('id')}"
      @html.should.containEql "<meta property=\"og:description\" content=\"Related auction results for From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"
      @html.should.containEql "<meta property=\"og:title\" content=\"Andy Warhol, Skull (1999) | Related Auction Results | Artsy"

  describe 'with an image', ->

    beforeEach ->
      @artwork = new Artwork fabricate 'artwork'
      @artwork.set image_versions: ["large"]
      @html = jade.render fs.readFileSync(@file).toString(),
        artwork: @artwork
        sd: @sd

    it 'includes og:image and twitter card', ->
      @html.should.containEql "<meta property=\"og:image\" content=\"http://localhost:5000/artwork/#{@artwork.get('id')}.jpg"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary_large_image"
