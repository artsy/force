_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate } = require 'antigravity'
Artwork = require '../../../models/artwork'
BidderPositions = require '../../../collections/bidder_positions'
SaleArtwork = require '../../../models/sale_artwork'
Sale = require '../../../models/sale'
cheerio = require 'cheerio'
DateHelpers = require '../../../components/util/date_helpers.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Auction', ->

  after ->
    benv.teardown()

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      @sd =
        API_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
      @saleArtwork = new SaleArtwork fabricate 'sale_artwork',
        highest_bid: amount_cents: 100
      @sale = new Sale(fabricate 'sale')
      done()

  describe 'register template', ->

    it 'renders the template without errors', ->
      template = render('registration')
        sd: @sd
        sale: @sale
        monthRange: DateHelpers.getMonthRange()
        yearRange: DateHelpers.getYearRange()
        asset: ->
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'

  describe 'bid template', ->

    it 'renders the template for unregistered users without errors', ->
      template = render('bid-form')
        sd: @sd
        sale: @sale
        artwork: @saleArtwork.artwork()
        saleArtwork: @saleArtwork
        bidderPositions: new BidderPositions([fabricate 'bidder_position'],
          { saleArtwork: @saleArtwork, sale: @sale })
        isRegistered: false
        hasValidCreditCard: false
        maxBid: 1234
        monthRange: DateHelpers.getMonthRange()
        yearRange: DateHelpers.getYearRange()
        accounting: formatMoney: ->
        bidIncrements: []
        asset: ->
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
      @$template.find('.bid-registration-form-contents').length.should.equal 1

    it 'renders the template without a credit card form if hasValidCreditCard is true', ->
      template = render('bid-form')
        sd: @sd
        sale: @sale
        artwork: @saleArtwork.artwork()
        saleArtwork: @saleArtwork
        bidderPositions: new BidderPositions([fabricate 'bidder_position'],
          { saleArtwork: @saleArtwork, sale: @sale })
        isRegistered: false
        hasValidCreditCard: true
        maxBid: 1234
        monthRange: DateHelpers.getMonthRange()
        yearRange: DateHelpers.getYearRange()
        accounting: formatMoney: ->
        bidIncrements: []
        asset: ->
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
      @$template.find('.bid-registration-form-contents').length.should.equal 0

    it 'renders the template for registered users without errors', ->
      template = render('bid-form')
        sd: @sd
        sale: @sale
        artwork: @saleArtwork.artwork()
        saleArtwork: @saleArtwork
        bidderPositions: new BidderPositions([fabricate 'bidder_position'],
          { saleArtwork: @saleArtwork, sale: @sale })
        isRegistered: true
        maxBid: 1234
        monthRange: DateHelpers.getMonthRange()
        yearRange: DateHelpers.getYearRange()
        accounting: formatMoney: ->
        bidIncrements: []
        asset: ->
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
      @$template.find('.bid-registration-form-contents').length.should.equal 0
