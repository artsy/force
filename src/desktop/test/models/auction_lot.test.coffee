_ = require 'underscore'
sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
AuctionLot = require '../../models/auction_lot'

describe 'AuctionLot', ->
  before ->
    @lot = new AuctionLot fabricate 'auction_result'

  describe '#href', ->
    it 'returns a URL to the auction lot', ->
      @lot.href(new Backbone.Model(id: 'foo-bar')).should.equal "/artist/foo-bar/auction-result/#{@lot.id}"

  describe '#toPageTitle', ->
    it 'returns a string usable for the page title', ->
      artist = new Backbone.Model name: 'Foo Bar'
      @lot.toPageTitle().should.equal 'Auction Result for \"MADONNA PAINTING\" (1985) | Lempertz, May 23, 2012 | Artsy'
      @lot.set artist_name: 'Foo Bar'
      @lot.toPageTitle(artist).should.equal 'Auction Result for \"MADONNA PAINTING\" (1985) by Foo Bar | Lempertz, May 23, 2012 | Artsy'

  describe '#toPageDescription', ->
    it 'returns a string usable for the page description', ->
      @lot.toPageDescription().should.equal 'Screenprint on canvas, 20.1 × 15.9 in. Estimate €120,000 - 160,000 from Lempertz on May 23, 2012. Find auction estimate and sale price, and research more auction results from top auction houses.'

  describe '#hasDimensions', ->
    it 'returns true if there is any dimension attributes present', ->
      @lot.hasDimensions().should.be.ok()
      @lot.unset 'dimensions'
      @lot.hasDimensions().should.not.be.ok()
      @lot.set 'dimensions', 'foobar'
      @lot.hasDimensions().should.not.be.ok()
      @lot.set 'dimensions', in: 'foo'
      @lot.hasDimensions().should.be.ok()
      @lot.set 'dimensions', cm: 'foo'
      @lot.hasDimensions().should.be.ok()
