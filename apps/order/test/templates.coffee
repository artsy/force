jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Order = require '../../../models/order'
cheerio = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

shippingInfo =
  telephone: '8675309'
  shipping_address:
    city: 'New York'
    region: "NY"
    postal_code: '10012'
    name: 'Artsy'
    street: '401 Broadway'

describe "Shipping Templates", ->

  describe "Order without shipping information", ->

    beforeEach ->
      @order = new Order(fabricate 'order')
      @template = render('shipping')(
        sd: {}
        order: @order
        asset: (->)
      )

    it "renders the order form", ->
      $ = cheerio.load @template
      $('.order-summary .value').text().should.containEql @order.get('total')
      $('.country.order-input-section select').val().should.containEql 'USA'
      $('.order-summary .order-seller-section .name').text().should.containEql @order.get('line_items')[0].partner.name

  describe "Order with shipping information", ->

    beforeEach ->
      @order = new Order(fabricate 'order')
      @order.set shippingInfo
      @template = render('shipping')(
        sd: {}
        order: @order
        asset: (->)
      )

    it "renders the order form", ->
      $ = cheerio.load @template
      $('.order-summary .value').text().should.containEql @order.get('total')
      $('.country.order-input-section select').val().should.containEql 'USA'
      $('.order-summary .order-seller-section .name').text().should.containEql @order.get('line_items')[0].partner.name

      $('.order-form .telephone input').val().should.containEql shippingInfo.telephone
      $('.order-form .street input').val().should.containEql shippingInfo.shipping_address.street

describe "Checkout Templates", ->

  describe "Order without shipping information", ->

    beforeEach ->
      @order = new Order(fabricate 'order')
      @template = render('checkout')(
        sd: {}
        order: @order
        asset: (->)
      )

    it "renders the order form", ->
      $ = cheerio.load @template
      $('.order-summary .value').text().should.containEql @order.get('total')
      $('.country.order-input-section select').val().should.containEql 'USA'
      $('.order-summary .order-seller-section .name').text().should.containEql @order.get('line_items')[0].partner.name

  describe "Order with shipping information", ->

    beforeEach ->
      @order = new Order(fabricate 'order')
      @order.set shippingInfo

      @template = render('checkout')(
        sd: {}
        order: @order
        asset: (->)
      )

    it "renders the order form", ->
      $ = cheerio.load @template
      $('.order-summary .value').text().should.containEql @order.get('total')
      $('.country.order-input-section select').val().should.containEql 'USA'
      $('.order-summary .order-seller-section .name').text().should.containEql @order.get('line_items')[0].partner.name

      $('.order-form .telephone input').val().should.containEql shippingInfo.telephone
      $('.order-form .street input').val().should.containEql shippingInfo.shipping_address.street

describe "Complete Templates", ->

  beforeEach ->
    @order = new Order(fabricate 'order')
    @template = render('complete')(
      sd: {}
      order: @order
      asset: (->)
    )

  it "renders the order form", ->
    $ = cheerio.load @template
    $('h2.garamond-header-center').text().should.containEql 'Congratulations'
