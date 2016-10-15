benv = require 'benv'
_ = require 'underscore'
Backbone = require 'backbone'
template = require('jade').compileFile(require.resolve '../templates/my_active_bids.jade')
bidderPositions = require './lot_standings'

describe 'my active bids auction page template', ->
  before (done) ->
    @baseData = -> bidderPositions
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @MyActiveBidsView = benv.require(require.resolve('../../../components/my_active_bids/view.coffee'))
    @data = @baseData()
    @view = new @MyActiveBidsView(template: template)

  describe 'my_active_bids', ->
    describe 'leading bidder & reserve met - winning message', ->
      it 'gives a reserve not met bid message', ->
        @data[0].is_leading_bidder = true
        @data[0].sale_artwork.reserve_status = 'reserve_met'
        @view.bidderPositions = @data

        @view.render()
        @view.$('.auction-mab-warning').should.have.lengthOf 2
        @view.$('.is-winning').should.have.lengthOf 1
        @view.$('.is-winning').text()
          .should.containEql('Highest Bid')

    describe 'leading bidder & reserve not met - reserve not met message', ->
      it 'gives a reserve not met bid message', ->
        @data[0].is_leading_bidder = true
        @data[0].sale_artwork.reserve_status = 'reserve_not_met'
        @view.bidderPositions = @data

        @view.render()
        @view.$('.auction-mab-warning').should.have.lengthOf 2
        @view.$('.is-winning-reserve-not-met').should.have.lengthOf 1
        @view.$('.is-winning-reserve-not-met').text()
          .should.containEql('Reserve not met')
    describe 'not leading bidder - outbid message', ->
      it 'gives an outbid bid message', ->
        @data[0].is_leading_bidder = false
        @data[0].sale_artwork.reserve_status = 'reserve_not_met'
        @data[1].is_leading_bidder = false
        @data[1].sale_artwork.reserve_status = 'reserve_met'
        @view.bidderPositions = @data

        @view.render()
        @view.$('.auction-mab-warning').should.have.lengthOf 2
        @view.$('.is-losing').should.have.lengthOf 2
        @view.$('.is-losing').text().should.containEql('Outbid')
        # This doesn't work ... :/
        # _.each(@view.$('.is-losing'), (el) -> 
        #   el.text().should.containEql('Outbid'))
