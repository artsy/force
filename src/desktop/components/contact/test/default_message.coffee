Artwork = require '../../../models/artwork'
Partner = require '../../../models/partner'
defaultMessage = require '../default_message'

describe 'defaultMessage', ->
  beforeEach ->
    @artwork = new Artwork artist: name: 'Foo Bar'

  describe 'sans partner', ->
    it 'returns the default message', ->
      defaultMessage @artwork
        .should.equal 'Hi, I’m interested in purchasing this work. ' +
          'Could you please provide more information about the piece?'

  describe 'with partner', ->
    beforeEach ->
      @partner = new Partner

    describe 'of Gallery type', ->
      beforeEach ->
        @partner.set 'type', 'Gallery'

      it 'returns the default message', ->
        defaultMessage @artwork, @partner
          .should.equal 'Hi, I’m interested in purchasing this work. ' +
            'Could you please provide more information about the piece?'

      it 'returns the similar message when the artwork is sold', ->
        @artwork.set availability: 'sold'
        defaultMessage @artwork, @partner
          .should.equal 'Hi, I’m interested in similar works by this artist. ' +
            'Could you please let me know if you have anything available?'

      it 'returns the similar message when the artwork is on loan', ->
        @artwork.set availability: 'on loan'
        defaultMessage @artwork, @partner
          .should.equal 'Hi, I’m interested in similar works by this artist. ' +
            'Could you please let me know if you have anything available?'

      it 'returns nothing when the artwork is not for sale', ->
        @artwork.set availability: 'not for sale'
        (typeof defaultMessage @artwork, @partner)
          .should.equal 'undefined'

    describe 'of Auction type', ->
      beforeEach ->
        @partner.set 'type', 'Auction'

      it 'returns the auction-specific message', ->
        defaultMessage @artwork, @partner
          .should.equal 'Hello, I am interested in placing a bid on this work. ' +
            'Please send me more information.'
