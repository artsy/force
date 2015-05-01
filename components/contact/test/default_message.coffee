sinon = require 'sinon'
Backbone = require 'backbone'
defaultMessage = require '../default_message'
Artwork = require '../../../models/artwork'
Partner = require '../../../models/partner'

describe 'defaultMessage', ->
  beforeEach ->
    @artwork = new Artwork artist: name: 'Foo Bar'

  describe 'sans partner', ->
    describe 'price is not displayable', ->
      beforeEach ->
        sinon.stub(@artwork, 'isPriceDisplayable').returns false

      afterEach ->
        @artwork.isPriceDisplayable.restore()

      it 'returns the default message if there is an artist', ->
        defaultMessage(@artwork)
          .should.equal 'I’m interested in this work by Foo Bar. Could you please confirm its availability and price? Thank you.'

      it 'returns the default message if there is no artist', ->
        defaultMessage(@artwork.unset 'artist')
          .should.equal 'I’m interested in this work. Could you please confirm its availability and price? Thank you.'

    describe 'price is displayable', ->
      beforeEach ->
        sinon.stub(@artwork, 'isPriceDisplayable').returns true

      afterEach ->
        @artwork.isPriceDisplayable.restore()

      it 'returns the default message if the price *can* be displayed', ->
        defaultMessage(@artwork)
          .should.equal 'I’m interested in this work by Foo Bar. Could you please confirm its availability? Thank you.'

  describe 'with partner', ->
    beforeEach ->
      @partner = new Partner

    describe 'of Gallery type', ->
      beforeEach ->
        @partner.set 'type', 'Gallery'

      it 'returns the default message', ->
        defaultMessage(@artwork, @partner)
          .should.equal 'I’m interested in this work by Foo Bar. Could you please confirm its availability and price? Thank you.'

    describe 'of Auction type', ->
      beforeEach ->
        @partner.set 'type', 'Auction'

      it 'returns the auction-specific message', ->
        defaultMessage(@artwork, @partner)
          .should.equal 'Hello, I am interested in placing a bid on this work. Please send me more information.'
