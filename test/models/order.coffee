_               = require 'underscore'
should          = require 'should'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Order           = require '../../models/order.coffee'

shippingInfo =
  telephone: '8675309'
  shipping_address:
    city: 'New York'
    region: "NY"
    postal_code: '10012'
    name: 'Artsy'
    street: '401 Broadway'

describe "Order", ->

  beforeEach ->
    @order = new Order(fabricate 'order')

  describe '#sellersTerms', ->

    it "returns links to the sellers terms", ->
      @order.sellersTerms().should.equal 'http://shipping.conditions.com'

  describe '#customShippingNote', ->

    it "returns the shipping notes", ->
      @order.shippingNote().should.equal "HI I'm a shipping note"

  describe '#getLineItemArtworks', ->

    it "returns artwork models in an order", ->
      @order.getLineItemArtworks()[0].get('id').should.include 'skull'

  describe '#getLineItemPartners', ->

    it "returns partner models with locations", ->
      @order.getLineItemPartners()[0].get('id').should.include 'gagosian'
      @order.getLineItemPartners()[0].get('partner_location').get('name').should.equal 'Eli Ridgway'

  describe '#formatShippingLocal', ->

    it "blank if no shipping info", ->
      @order.formatShippingLocal().should.equal ''

    it "formatted shipping info", ->
      @order.set shippingInfo
      @order.formatShippingLocal().should.equal 'New York, NY 10012'

  describe '#formatShippingAddress', ->

    it "blank if no shipping info", ->
      @order.formatShippingAddress().should.equal ''

    it "formatted shipping info", ->
      @order.set shippingInfo
      @order.formatShippingAddress().should.equal 'Artsy<br />8675309<br />401 Broadway<br />New York, NY 10012'
