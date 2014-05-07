_               = require 'underscore'
benv            = require 'benv'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ AToZ }        = require 'artsy-backbone-mixins'
{ fabricate }   = require 'antigravity'
Artwork         = require '../../../models/artwork'
Order           = require '../../../models/order'
SaleArtwork     = require '../../../models/sale_artwork'
Sale            = require '../../../models/sale'
cheerio         = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Auction', ->
  after -> benv.teardown()

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      @sd =
        CANONICAL_MOBILE_URL : 'http://localhost:5000'
        API_URL : 'http://localhost:5000'
        ASSET_PATH: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
      @order = new Order()
      @saleArtwork = new SaleArtwork(fabricate 'sale_artwork')
      @sale = new Sale(fabricate 'sale')
      done()

  describe 'register template', ->
    it 'renders the template without errors', ->
      template = render('registration')
        sd: @sd
        sale: @sale
        monthRange: @order.getMonthRange()
        yearRange: @order.getYearRange()
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'

  describe 'bid template', ->
    it 'renders the template for unregistred users without errors', ->
      template = render('bid-form')
        sd: @sd
        sale: @sale
        artwork: @saleArtwork.artwork()
        saleArtwork: @saleArtwork
        isRegistered: false
        maxBid: 1234
        monthRange: @order.getMonthRange()
        yearRange: @order.getYearRange()
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
      @$template.find('.bid-registration-form-contents').length.should.equal 1

    it 'renders the template for registred users without errors', ->
      template = render('bid-form')
        sd: @sd
        sale: @sale
        artwork: @saleArtwork.artwork()
        saleArtwork: @saleArtwork
        isRegistered: true
        maxBid: 1234
        monthRange: @order.getMonthRange()
        yearRange: @order.getYearRange()
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
      @$template.find('.bid-registration-form-contents').length.should.equal 0
