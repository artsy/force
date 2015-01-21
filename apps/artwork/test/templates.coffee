_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'graceful-fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate } = require 'antigravity'
Artist = require '../../../models/artist'
Artwork = require '../../../models/artwork'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork', ->

  before (done) ->
    @sd =
      CANONICAL_MOBILE_URL: 'http://localhost:5000'
      APP_URL: 'http://localhost:5000'
      API_URL: 'http://localhost:5000'
      CSS_EXT: '.css.gz'
      JS_EXT: '.js.gz'
      NODE_ENV: 'test'
      FACEBOOK_APP_NAMESPACE: 'artsyinc'
    @artwork = new Artwork (fabricate 'artwork', sale_message: '$6,000')
    @artist = new Artist (fabricate 'artist')
    done()

  describe 'index template', ->

    it 'renders without errors', ->
      template = render('index')
        sd: @sd
        artwork: @artwork
        artist: @artist
      @$template = cheerio.load template
      @$template.html().should.containEql @artwork.get('title')
      @$template.html().should.containEql @artist.get('name')
      @$template.html().should.not.containEql undefined

    it 'renders without errors without an artist', ->
      template = render('index')
        sd: @sd
        artwork: @artwork
      @$template = cheerio.load template
      @$template.html().should.containEql @artwork.get('title')
      @$template.html().should.not.containEql undefined

  describe 'detail template', ->
    it 'renders without errors', ->
      template = render('_detail')
        sd: @sd
        artwork: @artwork
        artist: @artist
      @$template = cheerio.load template
      @$template.html().should.containEql @artwork.get('title')
      @$template.html().should.containEql @artist.get('name')
      @$template.html().should.containEql 'artwork-meta-price'
      @$template.html().should.not.containEql undefined

    it 'renders without errors without an artist', ->
      template = render('_detail')
        sd: @sd
        artwork: @artwork
      @$template = cheerio.load template
      @$template.html().should.containEql @artwork.get('title')
      @$template.html().should.containEql 'artwork-meta-price'
      @$template.html().should.not.containEql undefined

    it 'does not include pricing information if auctionId passed in', ->
      template = render('index')
        sd: @sd
        artwork: @artwork
        artist: @artist
        auctionId: 'two-x-two'
      @$template = cheerio.load template
      @$template.html().should.not.containEql 'artwork-meta-price'
