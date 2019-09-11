_ = require 'underscore'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
SaleArtwork = require '../../../models/sale_artwork'
Sale = require '../../../models/sale'
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
      @saleArtwork = new SaleArtwork(fabricate 'sale_artwork')
      @sale = new Sale(fabricate 'sale')
      done()

  describe 'register template', ->

    it 'renders the template without errors', ->
      template = render('registration')
        sd: @sd
        sale: @sale
        monthRange: [1..12]
        yearRange: DateHelpers.getYearRange()
        asset: ->
      @$template = $(template)
      @$template.html().should.not.containEql 'undefined'
