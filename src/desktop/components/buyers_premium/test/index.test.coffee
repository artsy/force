sinon = require 'sinon'
Sale = require '../../../models/sale'
Backbone = require 'backbone'
buyersPremium = require '../'
{ fabricate } = require '@artsy/antigravity'

describe 'buyersPremium', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders buyers premium based on the sale and page', (done) ->
    buyersPremium new Sale(fabricate 'sale'), (err, html) ->
      html.should.containEql "<div class='buyers-premium-pre'>"
      html.should.containEql '25%'
      done()
    Backbone.sync.args[0][2].success fabricate 'page'

  it 'renders buyers premium on a flat fee', (done) ->
    sale = fabricate('sale', buyers_premium: { 'schedule': [{ 'min_amount_cents': 0, 'percent': 0.25 }] })
    buyersPremium new Sale(sale), (err, html) ->
      html.should.containEql "25% on the hammer price"
      done()
    Backbone.sync.args[0][2].success fabricate 'page'
 
  it 'renders buyers premium nicely that multiplies by 100 poorly', (done) ->
    sale = fabricate('sale', buyers_premium: { 'schedule': [{ 'min_amount_cents': 0, 'percent': 0.144 }] })
    buyersPremium new Sale(sale), (err, html) ->
      html.should.containEql "14.4% on the hammer price"
      done()
    Backbone.sync.args[0][2].success fabricate 'page'
