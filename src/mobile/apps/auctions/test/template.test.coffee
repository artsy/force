_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
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
          _: require 'underscore'
          asset: (->)
          pastAuctions: [@closedSale]
          currentAuctions: [@openSale]
          upcomingAuctions: [@previewSale]
        , ->
          done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.auctions-page-list[data-list=current]').length.should.equal 1
      $('.auctions-page-list[data-list=past]').length.should.equal 1
      $('.auctions-page-list[data-list=upcoming]').length.should.equal 1
