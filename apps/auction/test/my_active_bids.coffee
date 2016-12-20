benv = require 'benv'
moment = require 'moment'
_ = require 'underscore'
Backbone = require 'backbone'
template = require('jade').compileFile(require.resolve '../templates/my_active_bids.jade')
bidderPositions = require './lot_standings'
sd = require('sharify').data

describe 'my active bids auction page template', ->
  before (done) ->
    @baseData = -> bidderPositions
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      sd.PREDICTION_URL = 'http://live-test.artsy.net'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @MyActiveBidsView = benv.require(require.resolve('../../../components/my_active_bids/view.coffee'))
    @data = @baseData()
    @view = new @MyActiveBidsView(template: template)

  describe 'my_active_bids', ->
    describe 'live sale is open', ->
      beforeEach ->
        @data[0].sale_artwork.sale.live_start_at = moment().subtract(1, 'day').format()
        @data[0].sale_artwork.sale.is_live_open = true
        @data[0].sale_artwork.sale.end_at = moment().add(1, 'day').format()
        @view.bidderPositions = @data
        @view.render()

      it 'does not display the bidder status', ->
        @view.$('.bid-status').should.have.lengthOf 1
        @view.$('.auction-mab-bid-live-button').should.have.lengthOf 1
        @view.$('.auction-mab-bid-live-button').text().should.containEql('Bid Live')

      it 'links to prediction', ->
        @view.$('.auction-mab-bid-live-button').attr('href')
          .should.containEql('http://live-test.artsy.net/juliens-auctions-street-and-contemporary-art-day-sale')

    describe 'not live sale', ->
      beforeEach ->
        @data[0].sale_artwork.sale.live_start_at = null
        @data[0].sale_artwork.sale.is_live_open = false
        @data[0].sale_artwork.sale.end_at = moment().add(1, 'day').format()

      describe 'leading bidder & reserve met', ->
        it 'gives a highest bid message', ->
          @data[0].is_leading_bidder = true
          @data[0].sale_artwork.reserve_status = 'reserve_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-winning').should.have.lengthOf 1
          @view.$('.bid-status').text()
            .should.containEql('Highest Bid')

      describe 'leading bidder & reserve not met', ->
        it 'gives a reserve not met bid message', ->
          @data[0].is_leading_bidder = true
          @data[0].sale_artwork.reserve_status = 'reserve_not_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-winning-reserve-not-met').should.have.lengthOf 1
          @view.$('.bid-status__is-winning-reserve-not-met').text()
            .should.containEql('Highest Bid')

      describe 'not leading bidder', ->
        it 'gives an outbid message', ->
          @data[0].is_leading_bidder = false
          @data[0].sale_artwork.reserve_status = 'reserve_not_met'
          @data[1].is_leading_bidder = false
          @data[1].sale_artwork.reserve_status = 'reserve_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-losing').should.have.lengthOf 2
          @view.$('.bid-status__is-losing').text().should.containEql('Outbid')
          # This doesn't work ... :/
          # _.each(@view.$('.is-losing'), (el) ->
          #   el.text().should.containEql('Outbid'))

    describe 'live sale is not open', ->
      beforeEach ->
        @data[0].sale_artwork.sale.live_start_at = moment().add(1, 'day').format()
        @data[0].sale_artwork.sale.end_at = moment().add(2, 'days').format()
        @data[0].sale_artwork.sale.is_live_open = false

      describe 'leading bidder & reserve met', ->
        it 'gives a highest bid message', ->
          @data[0].is_leading_bidder = true
          @data[0].sale_artwork.reserve_status = 'reserve_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-winning').should.have.lengthOf 1
          @view.$('.bid-status').text()
            .should.containEql('Highest Bid')

      describe 'leading bidder & reserve not met', ->
        it 'gives a reserve not met bid message', ->
          @data[0].is_leading_bidder = true
          @data[0].sale_artwork.reserve_status = 'reserve_not_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-winning-reserve-not-met').should.have.lengthOf 1
          @view.$('.bid-status__is-winning-reserve-not-met').text()
            .should.containEql('Highest Bid')

      describe 'not leading bidder', ->
        it 'gives an outbid message', ->
          @data[0].is_leading_bidder = false
          @data[0].sale_artwork.reserve_status = 'reserve_not_met'
          @data[1].is_leading_bidder = false
          @data[1].sale_artwork.reserve_status = 'reserve_met'
          @view.bidderPositions = @data

          @view.render()
          @view.$('.bid-status').should.have.lengthOf 2
          @view.$('.bid-status__is-losing').should.have.lengthOf 2
          @view.$('.bid-status__is-losing').text().should.containEql('Outbid')
          # This doesn't work ... :/
          # _.each(@view.$('.is-losing'), (el) ->
          #   el.text().should.containEql('Outbid'))
