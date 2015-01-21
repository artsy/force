fs = require 'graceful-fs'
jade = require 'jade'
sinon = require 'sinon'
Artwork = require '../../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->
  before ->
    @file = "#{process.cwd()}/apps/artwork/templates/meta.jade"
    @sd =
      APP_URL: 'http://localhost:5000'
      CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
      MOBILE_MEDIA_QUERY: 'mobile-media-query'
      FACEBOOK_APP_NAMESPACE: 'artsyinc'

  describe 'shareable artwork', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork', id: 'foobar', can_share_image: true
      @html = jade.render fs.readFileSync(@file).toString(), artwork: @artwork, sd: @sd

    it 'includes mobile alternate, canonical, twitter card, og tags', ->
      @html.should.containEql '<title>Andy Warhol | Skull (1999) | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Andy Warhol | Skull (1999) | Artsy"/>'
      @html.should.containEql '<meta name="description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<meta property="og:description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<meta property="twitter:description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<link rel="alternate" media="mobile-media-query" href="http://m.localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<meta property="og:type" content="artsyinc:artwork"/>'
      @html.should.containEql '<meta property="twitter:card" content="summary_large_image"/>'
      @html.should.containEql '<meta property="og:image" content="/local/additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg"/>'

  describe 'unshareable artwork', ->
    beforeEach ->
      @artwork = new Artwork fabricate 'artwork', id: 'foobar', can_share_image: false
      @html = jade.render fs.readFileSync(@file).toString(), artwork: @artwork, sd: @sd

    it 'includes mobile alternate, canonical, twitter card, og tags; but prevents the artwork image from being included', ->
      @html.should.containEql '<title>Andy Warhol | Skull (1999) | Artsy</title>'
      @html.should.containEql '<meta property="og:title" content="Andy Warhol | Skull (1999) | Artsy"/>'
      @html.should.containEql '<meta name="description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<meta property="og:description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<meta property="twitter:description" content="From Gagosian Gallery, Andy Warhol, Skull (1999), Watercolor on Paper, 10 × 20 × 30in"/>'
      @html.should.containEql '<link rel="alternate" media="mobile-media-query" href="http://m.localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<link rel="canonical" href="http://localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<meta property="og:url" content="http://localhost:5000/artwork/foobar"/>'
      @html.should.containEql '<meta property="og:type" content="artsyinc:artwork"/>'

      @html.should.containEql '<meta property="og:image" content="/assets/icon-152.png"/>'
      @html.should.not.containEql '<meta property="og:image" content="/local/additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg"/>'

      @html.should.containEql '<meta property="twitter:card" content="summary"/>'
      @html.should.not.containEql '<meta property="twitter:card" content="summary_large_image"/>'
