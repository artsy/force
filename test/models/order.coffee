_               = require 'underscore'
should          = require 'should'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Order           = require '../../models/order.coffee'

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
