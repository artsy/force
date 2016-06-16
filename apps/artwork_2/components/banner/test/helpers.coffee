sinon = require 'sinon'
moment = require 'moment'
{ countdownLabel } = require '../helpers'

describe 'auction_artworks helpers', ->
  describe '#countdownLabel', ->
    beforeEach ->
      @clock = sinon.useFakeTimers()

    afterEach ->
      @clock.restore()

    it 'renders the correct label if the auction is not yet open', ->
      countdownLabel moment().add(1, 'day').format()
        .should.equal 'Auction opens in'

    it 'renders the correct label if the auction is open', ->
      countdownLabel moment().subtract(1, 'day').format()
        .should.equal 'Auction closes in'
