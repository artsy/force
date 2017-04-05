_ = require 'underscore'
should = require 'should'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Order = require '../../models/order'
sinon = require 'sinon'

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
    sinon.stub Backbone, 'sync'
    @order = new Order(fabricate 'order')

  afterEach ->
    Backbone.sync.restore()

  describe '#sellersTerms', ->

    it "returns links to the sellers terms", ->
      @order.sellersTerms().should.equal 'http://shipping.conditions.com'

  describe '#customShippingNote', ->

    it "returns the shipping notes", ->
      @order.shippingNote().should.equal "HI I'm a shipping note"

    it "returns the shipping notes stripped of html", ->
      @order.set 'line_items', [{shipping_note: '<img>'}]
      @order.shippingNote().should.equal "&lt;img>"

  describe '#getLineItemArtworks', ->

    it "returns artwork models in an order", ->
      @order.getLineItemArtworks()[0].get('id').should.containEql 'skull'

  describe '#getLineItemPartners', ->

    it "returns partner models with locations", ->
      @order.getLineItemPartners()[0].get('id').should.containEql 'gagosian'
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
      @order.formatShippingAddress().should.equal 'Artsy<br />401 Broadway<br />New York, NY 10012'

    it "formatted shipping info stripped of HTML", ->
      info = _.clone shippingInfo
      info.shipping_address.name = "<img>"
      @order.set info
      @order.formatShippingAddress().should.equal '&lt;img><br />401 Broadway<br />New York, NY 10012'

  describe '#fetchPendingOrder', ->

    it 'constructs the correct url', ->
      @order.fetchPendingOrder({})
      Backbone.sync.args[0][2].url.should.containEql 'api/v1/me/order/pending'

  describe '#update', ->

    it 'constructs the correct url', ->
      @order.update null, success: (order) =>
        order.id.should.equal 'updated'
      Backbone.sync.args[0][2].url.should.containEql "api/v1/me/order/#{@order.id}"
      Backbone.sync.args[0][2].success(fabricate 'order', id: 'updated')

  describe '#resume', ->

    it 'constructs the correct url', ->
      @order.resume success: (order) =>
        order.get('state').should.equal 'pending'
      Backbone.sync.args[0][2].url.should.containEql "api/v1/me/order/#{@order.id}/resume"
      Backbone.sync.args[0][2].success(fabricate 'order', state: 'pending')
