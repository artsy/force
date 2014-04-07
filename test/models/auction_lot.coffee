_               = require 'underscore'
sinon           = require 'sinon'
should          = require 'should'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
AuctionLot      = require '../../models/auction_lot'

describe 'AuctionLot', ->
  before ->
    @lot = new AuctionLot fabricate 'auction_result'

  describe '#formattedEstimateText', ->
    it 'formats the estimate text with line breaks and an endash', ->
      @lot.formattedEstimateText().should.equal '€120,000&nbsp;&ndash;<br>160,000'

  describe '#href', ->
    it 'returns a URL to the auction lot', ->
      @lot.href(new Backbone.Model(id: 'foo-bar')).should.equal "/artist/foo-bar/auction-result/#{@lot.id}"

  describe '#imageUrl', ->
    it 'overwrites the default #imageUrl method to simply replace thumbnail in the string', ->
      @lot.imageUrl('original').should.equal 'http://static1.artsy.net/auction_lots/51d041844c91c616610005a0/original.jpg'

  describe '#toPageTitle', ->
    it 'returns a string usable for the page title', ->
      artist = new Backbone.Model name: 'Foo Bar'
      @lot.toPageTitle().should.equal 'MADONNA PAINTING | Auction Result from Lempertz | Artsy'
      @lot.set artist_name: 'Foo Bar'
      @lot.toPageTitle(artist).should.equal 'MADONNA PAINTING, by Foo Bar | Auction Result from Lempertz | Artsy'

  describe '#hasDimensions', ->
    it 'returns true if there is any dimension attributes present', ->
      @lot.hasDimensions().should.be.ok
      @lot.unset 'dimensions'
      @lot.hasDimensions().should.not.be.ok
      @lot.set 'dimensions', 'foobar'
      @lot.hasDimensions().should.not.be.ok
      @lot.set 'dimensions', in: 'foo'
      @lot.hasDimensions().should.be.ok
      @lot.set 'dimensions', cm: 'foo'
      @lot.hasDimensions().should.be.ok
