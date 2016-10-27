ViewHelpers = require '../helpers.coffee'
sd = require('sharify').data
moment = require 'moment'

describe 'My Active Bids View Helpers', ->
  describe '#mpLiveSaleIsOpen', ->
    it 'returns true if the sale is a live sale that is open', ->
      sale = {
        live_start_at: moment().subtract(1, 'day').format(),
        end_at: moment().add(1, 'day').format()
      }
      ViewHelpers.mpLiveSaleIsOpen(sale).should.eql true
    it 'returns false if the sale is a live sale that is over', ->
      sale = {
        live_start_at: moment().subtract(2, 'days').format(),
        end_at: moment().subtract(1, 'day').format()
      }
      ViewHelpers.mpLiveSaleIsOpen(sale).should.eql false
    it 'returns false if the sale is a live sale that has not started', ->
      sale = {
        live_start_at: moment().add(1, 'day').format(),
        end_at: moment().add(2, 'days').format()
      }
      ViewHelpers.mpLiveSaleIsOpen(sale).should.eql false
    it 'returns false if the sale is not a live sale', ->
      sale = {
        live_start_at: null,
        end_at: moment().add(2, 'days').format()
      }
      ViewHelpers.mpLiveSaleIsOpen(sale).should.eql false
