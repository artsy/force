benv = require 'benv'
_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
Sale = require '../../../models/sale.coffee'
Artwork = require '../../../models/artwork.coffee'
SaleArtworks = require '../../../collections/sale_artworks.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
moment = require 'moment'

describe 'AuctionReminder', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
    sinon.stub Backbone, 'sync'
    AuctionReminder = benv.requireWithJadeify resolve(__dirname, '../index'), ['auctionTemplate']
    AuctionReminder.__set__ 'Cookies', { set: (->) }
    @reminder = new AuctionReminder
    done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#module.exports', ->
    it 'fetches auction and auction image if there is one', ->
      Backbone.sync.args[0][2].success [fabricate('sale', { id: "fake-sale" }), fabricate('sale')]
      Backbone.sync.args[1][2].success [fabricate('artwork', { id: "fake-artwork" }), fabricate('artwork')]
      Backbone.sync.args[2][1].get('id').should.equal "fake-artwork"

    it 'returns an error if there are no auctions', ->
      Backbone.sync.args[0][2].error()

    it 'does not error when there are no sales', ->
      Backbone.sync.callCount.should.equal 1
      Backbone.sync.args[0][2].success []
      Backbone.sync.callCount.should.equal 1

describe 'AuctionReminderModal', ->


  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
    sinon.stub Backbone, 'sync'
    AuctionReminder = benv.requireWithJadeify resolve(__dirname, '../index'), ['auctionTemplate']
    AuctionReminder.__set__ 'Cookies', { set: (->) }
    @AuctionReminderModal = AuctionReminder.__get__ 'AuctionReminderModal'
    @AuctionReminderModal::open = sinon.stub()
    done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'displays if there are less than 24 hours until the end of the auction', ->
      auction = new Sale fabricate 'sale', { end_at: moment().add(5,'hours') }
      view = new @AuctionReminderModal(
        auction: auction
        auctionImage: @auctionImage
      )
      _.isUndefined(view.$container).should.equal false

    it 'displays if there are less than 24 hours until the end, part two', ->
      auction = new Sale fabricate 'sale', { end_at: moment().add(23,'hours').add(59,'minutes') }
      view = new @AuctionReminderModal(
        auction: auction
        auctionImage: @auctionImage
      )
      _.isUndefined(view.$container).should.equal false

    it 'does not display if there are more than 24 hours until the end', ->
      auction = new Sale fabricate 'sale', { end_at: moment().add(25,'hours') }
      view = new @AuctionReminderModal(
        auction: auction
        auctionImage: @auctionImage
      )
      _.isUndefined(view.$container).should.equal true

