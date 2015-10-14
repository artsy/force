_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate } = require 'antigravity'
Artist = require '../../../../../models/artist'
Artwork = require '../../../../../models/artwork'
SaleArtwork = require '../../../../../models/sale_artwork'
User = require '../../../../../models/user'
Auction = require '../../../../../models/auction'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork auction detail', ->
  before (done) ->
    @sd =
      CANONICAL_MOBILE_URL: 'http://localhost:5000'
      APP_URL: 'http://localhost:5000'
      API_URL: 'http://localhost:5000'
      CSS_EXT: '.css.gz'
      JS_EXT: '.js.gz'
      NODE_ENV: 'test'
      FACEBOOK_APP_NAMESPACE: 'artsyinc'
    @artwork = new Artwork fabricate 'artwork', sale_message: '$6,000'
    @artist = new Artist fabricate 'artist'
    done()

  it 'shows buyer premium for open auctions with a BP', ->
    @artwork.set acquireable: false
    auction = new Auction fabricate 'sale'
    auction.isOpen = -> true
    template = render('template')
      sd: @sd
      artwork: @artwork
      artist: @artist
      auction: auction
      saleArtwork: new SaleArtwork fabricate 'sale_artwork'
      user: new User fabricate 'user'
      asset: ->
    template.should.containEql "Buyer's Premium"

  it 'does not show buyer premium for open auctions without a BP', ->
    @artwork.set acquireable: false
    auction = new Auction fabricate 'sale', buyers_premium: null
    auction.isOpen = -> true
    template = render('template')
      sd: @sd
      artwork: @artwork
      artist: @artist
      auction: auction
      saleArtwork: new SaleArtwork fabricate 'sale_artwork'
      user: new User fabricate 'user'
      asset: ->
    template.should.not.containEql "Buyer's Premium"

  it 'shows buy now button for works that are acquireable and have no bids', ->
    @artwork.set acquireable: true
    auction = new Auction fabricate 'sale', buyers_premium: null
    auction.isOpen = -> true
    template = render('template')
      sd: @sd
      artwork: @artwork
      artist: @artist
      auction: auction
      saleArtwork: new SaleArtwork fabricate 'sale_artwork', bidder_positions_count: 0
      user: new User fabricate 'user'
      asset: ->
    template.should.containEql "Buy Now"
