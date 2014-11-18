_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Sale = require '../../../models/sale'

describe 'Auctions template', ->
  before ->
    auctions = [
      @openSale = new Sale fabricate 'sale', auction_state: 'open', id: 'open-sale'
      @closedSale = new Sale fabricate 'sale', auction_state: 'closed', id: 'closed-sale'
      @previewSale = new Sale fabricate 'sale', auction_state: 'preview', id: 'preview-sale'
    ]

  describe 'with auctions', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          pastAuctions: [@closedSale]
          currentAuctions: [@openSale]
          upcomingAuctions: [@previewSale]
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.af-name').length.should.equal 2
      $('.ap-upcoming-item').length.should.equal 2
