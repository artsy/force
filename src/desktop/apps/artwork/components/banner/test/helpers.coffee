sinon = require 'sinon'
moment = require 'moment'
{ countdownLabel, showCountdown } = require '../helpers'

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

    it 'renders the correct label if the live auction has not started yet', ->
      countdownLabel moment().subtract(1, 'day').format(), moment().add(1, 'day').format()
        .should.equal 'Live bidding opening in'

  describe '#showCountdown', ->
    beforeEach ->
      @clock = sinon.useFakeTimers()

    afterEach ->
      @clock.restore()

    it 'returns true if it is after start at but before the live start at', ->
      showCountdown moment().subtract(1, 'day').format(), moment().add(1, 'day').format()
        .should.equal true

    it 'returns false if it is after the live start at', ->
      showCountdown moment().subtract(2, 'days').format(), moment().subtract(1, 'day').format()
        .should.equal false

