sinon = require 'sinon'
Sale = require '../../../models/sale'
Backbone = require 'backbone'
buyersPremium = require '../'
{ fabricate } = require 'antigravity'

describe 'buyersPremium', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders buyers premium based on the sale and page', (done) ->
    buyersPremium new Sale(fabricate 'sale'), (err, html) ->
      html.should.containEql "<div class='buyers-premium-perc'>25%"
      done()
    Backbone.sync.args[0][2].success fabricate 'page'
