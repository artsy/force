jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Order           = require '../../../models/order'
cheerio         = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe "Shipping Templates", ->

  beforeEach ->
    @order = new Order(fabricate 'order')
    @template = render('shipping')(
      sd:
        ASSET_PATH: 'localhost:3000'
      order: @order
    )

  it "renders the order form", ->
    $ = cheerio.load @template
    $('.order-summary .value').text().should.include @order.get('total')
    $('.country.order-input-section select').val().should.include 'USA'
    $('.order-summary .order-seller-section .location').text().should.include @order.get('line_items')[0].partner_location.city

describe "Checkout Templates", ->

  beforeEach ->
    @order = new Order(fabricate 'order')
    @template = render('checkout')(
      sd:
        ASSET_PATH: 'localhost:3000'
      order: @order
    )

  it "renders the order form", ->
    $ = cheerio.load @template
    $('.order-summary .value').text().should.include @order.get('total')
    $('.country.order-input-section select').val().should.include 'USA'
    $('.order-summary .order-seller-section .location').text().should.include @order.get('line_items')[0].partner_location.city

describe "Complete Templates", ->

  beforeEach ->
    @order = new Order(fabricate 'order')
    @template = render('complete')(
      sd:
        ASSET_PATH: 'localhost:3000'
      order: @order
    )

  it "renders the order form", ->
    $ = cheerio.load @template
    $('h2.garamond-header-center').text().should.include 'Congratulations'
