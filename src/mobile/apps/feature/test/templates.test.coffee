jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'
SaleArtwork = require '../../../models/sale_artwork'
Sale = require '../../../models/sale'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Bid page template', ->

  it 'is fine for artworks without artists', ->
    render('bid_page')(
      saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
      artwork: new Artwork(fabricate 'artwork', artist: null)
      auction: new Sale fabricate 'sale'
      sd: {}
      accounting: require('accounting')
      bidIncrements: []
    ).should.containEql 'Confirm your bid'

describe 'Register button', ->

  it 'should display register to bid if the user is not registered', ->
    it 'is fine for artworks without artists', ->
      render('bid_page')(
        saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
        artwork: new Artwork(fabricate 'artwork', artist: null)
        auction: new Sale fabricate 'sale'
        registered: false
        sd: {}
        accounting: require('accounting')
      ).should.containEql 'Register to bid'

  it 'should display registration closed if registration_ends_at has passed', ->
    it 'is fine for artworks without artists', ->
      render('bid_page')(
        saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
        artwork: new Artwork(fabricate 'artwork', artist: null)
        auction: new Sale fabricate 'sale', registration_ends_at: moment().subtract(2, 'days').format()
        registered: false
        sd: {}
        accounting: require('accounting')
      ).should.containEql 'Registration Closed'

  it 'should display registration closed if registration_ends_at has passed even if you are registered and qualified', ->
    it 'is fine for artworks without artists', ->
      render('bid_page')(
        saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
        artwork: new Artwork(fabricate 'artwork', artist: null)
        auction: new Sale fabricate 'sale', registration_ends_at: moment().subtract(2, 'days').format()
        registered: true
        qualified: true
        sd: {}
        accounting: require('accounting')
      ).should.containEql 'Registration Closed'

  it 'should display registration pending if you are registered but not qualified', ->
    it 'is fine for artworks without artists', ->
      render('bid_page')(
        saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
        artwork: new Artwork(fabricate 'artwork', artist: null)
        auction: new Sale fabricate 'sale', registration_ends_at: moment().subtract(2, 'days').format()
        registered: true
        qualified: false
        sd: {}
        accounting: require('accounting')
      ).should.containEql 'Registration Pending'

  it 'should not display a register button if you are not registered but do have a qualified credit card on file', ->
    template = render('bid_page')(
      saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
      artwork: new Artwork(fabricate 'artwork', artist: null)
      auction: new Sale fabricate 'sale'
      registered: false
      qualified: false
      hasQualifiedCreditCard: true
      sd: {}
      accounting: require('accounting')
      bidIncrements: []
    )
    template.should.not.containEql 'Register to bid'
    $ = cheerio.load template
    $('.feature-bid-page-max-bid-overlay').length.should.equal 0

  it 'should display a register button if you are not registered and do not have a qualified credit card on file', ->
    template = render('bid_page')(
      saleArtwork: new SaleArtwork(fabricate 'sale_artwork')
      artwork: new Artwork(fabricate 'artwork', artist: null)
      auction: new Sale fabricate 'sale'
      registered: false
      qualified: false
      hasQualifiedCreditCard: false
      sd: {}
      accounting: require('accounting')
      bidIncrements: []
    )
    template.should.containEql 'Register to bid'
    $ = cheerio.load template
    $('.feature-bid-page-max-bid-overlay').length.should.equal 1

