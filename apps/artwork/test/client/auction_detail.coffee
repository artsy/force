_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

CurrentUser       = require '../../../../models/current_user'
SaleArtwork       = require '../../../../models/sale_artwork'
Sale              = require '../../../../models/sale'
BidderPositions   = require '../../../../collections/bidder_positions'

describe 'AuctionDetailView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    AuctionDetailView = benv.requireWithJadeify resolve(__dirname, '../../client/auction_detail'), ['template']

    @saleArtwork  = new SaleArtwork fabricate 'sale_artwork', minimum_next_bid_cents: 500000, reserve_status: 'no_reserve'
    @auction      = new Sale fabricate 'sale'

    @auction.set 'auctionState', 'open'

    @view = new AuctionDetailView(
      user            : @user = new CurrentUser fabricate 'user'
      bidderPositions : @bidderPositions = new BidderPositions
      saleArtwork     : @saleArtwork
      auction         : @auction
      el              : @$el = $('<div></div>')
    ).render()
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'displays the correct min price', ->
      @view.$('.abf-validation-error').text().should.equal 'Your bid needs to be at least $5,000.00'
      @view.$('.abf-min-next').text().should.equal 'Enter $5,000.00 or higher'

    it 'displays a description of the bid status', ->
      @view.$('.abs-count').text().should.equal '(0 bids, No reserve)'

    it 'does not display what it does not have', ->
      @view.$('.artwork-bidder-position-status').length.should.not.be.ok
      @view.$('.typed-bordered-input').length.should.be.ok
      @auction.set('auctionState', 'closed')
      @view.render()
      @view.$('.typed-bordered-input').length.should.not.be.ok

    describe 'renders the appropriate bid button', ->
      it 'handles an undefined user, during auction preview', ->
        @auction.set 'auctionState', 'preview'
        @view.user = undefined
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Register to bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles an unregistered user, during auction preview', ->
        @auction.set 'auctionState', 'preview'
        @user.set 'registered_to_bid', false
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Register to bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles a registered user, during auction preview', ->
        @auction.set 'auctionState', 'preview'
        @user.set 'registered_to_bid', true
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Registered to bid'
        _.isUndefined($button.attr 'disabled').should.not.be.ok
        $button.attr('class').should.include 'is-success'
        $button.attr('class').should.include 'is-disabled'

      it 'handles open auctions', ->
        @auction.set 'auctionState', 'open'
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles closed auctions', ->
        @auction.set 'auctionState', 'closed'
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Bidding closed'
        _.isUndefined($button.attr 'disabled').should.not.be.ok
        $button.attr('class').should.include 'is-disabled'

  describe '#validate', ->
    it 'validates that any input is greater than or equal to the min bid and returns the value if it is valid', ->
      _.isUndefined(@view.validate 'foobar').should.be.ok
      _.isUndefined(@view.validate '499').should.be.ok
      _.isUndefined(@view.validate 499).should.be.ok
      _.isUndefined(@view.validate '499.00').should.be.ok
      _.isUndefined(@view.validate '4,999.00').should.be.ok

      @view.validate(5000).should.equal 5000
      @view.validate('5000').should.equal 5000
      @view.validate('5000.00').should.equal 5000
      @view.validate('5,000.00').should.equal 5000
      @view.validate('500,000').should.equal 500000

  describe '#displayValidationError', ->
    it 'displays the error when an invalid value is input and submitted', ->
      @view.$('.abf-validation-error').css('display', 'none')
      @view.$('input').val('499')
      @view.$('form').submit()
      @view.$('.abf-validation-error').css('display').should.equal 'block'
      @view.$('button').data('state').should.equal 'error'
