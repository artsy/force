_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../../models/current_user'
SaleArtwork = require '../../../../../models/sale_artwork'
Auction = require '../../../../../models/auction'
Artwork = require '../../../../../models/artwork'
BidderPositions = require '../../../../../collections/bidder_positions'

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
    AuctionDetailView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
    @triggerSpy = sinon.stub()
    AuctionDetailView.__set__ 'mediator', trigger: @triggerSpy

    @saleArtwork = new SaleArtwork fabricate 'sale_artwork', minimum_next_bid_cents: 500000, low_estimate_cents: 600000, high_estimate_cents: 800000, reserve_status: 'no_reserve'
    @auction = new Auction fabricate 'sale'

    @auction.set 'clockState', 'open'

    @view = new AuctionDetailView(
      artwork: @artwork = new Artwork fabricate 'artwork'
      user: @user = new CurrentUser fabricate 'user'
      bidderPositions: @bidderPositions = new BidderPositions
      saleArtwork: @saleArtwork
      auction: @auction
    ).render()

    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'displays the correct min price', ->
      @view.$('.abf-validation-error').text().should.equal 'Your bid needs to be at least $5,000'
      @view.$('.abf-min-next').text().should.equal 'Enter $5,000 or higher'

    it 'displays a description of the bid status', ->
      @view.$('.abs-count').text().should.equal '(0 bids)'

    it 'displays estimate', ->
      @view.$('.artwork-auction-estimate').text().should.equal 'Estimate: $6,000–$8,000'

    it 'does not display what it does not have', ->
      @view.$('.artwork-bidder-position-status').length.should.not.be.ok
      @view.$('.typed-bordered-input').length.should.be.ok
      @auction.set('clockState', 'closed')
      @view.render()
      @view.$('.typed-bordered-input').length.should.not.be.ok

    describe 'renders the appropriate bid button', ->
      it 'handles an undefined user, during auction preview', ->
        @auction.set 'clockState', 'preview'
        @view.user = undefined
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Register to bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles an unregistered user, during auction preview', ->
        @auction.set 'clockState', 'preview'
        @user.set 'registered_to_bid', false
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Register to bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles a registered user, during auction preview', ->
        @auction.set 'clockState', 'preview'
        @user.set 'registered_to_bid', true
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Registered to bid'
        _.isUndefined($button.attr 'disabled').should.not.be.ok
        $button.attr('class').should.containEql 'is-success'
        $button.attr('class').should.containEql 'is-disabled'

      it 'handles open auctions', ->
        @auction.set 'clockState', 'open'
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Bid'
        _.isUndefined($button.attr 'disabled').should.be.ok

      it 'handles closed auctions', ->
        @auction.set 'clockState', 'closed'
        @auction.__bidButtonState__ = undefined
        @view.render()
        $button = @view.$('.abf-button')
        $button.text().should.equal 'Online Bidding Closed'
        _.isUndefined($button.attr 'disabled').should.not.be.ok
        $button.attr('class').should.containEql 'is-disabled'

  describe '#validate', ->
    it 'validates that any input is greater than or equal to the min bid and returns the value if it is valid', ->
      _.isUndefined(@view.validate 'foobar').should.be.ok
      _.isUndefined(@view.validate '499').should.be.ok
      _.isUndefined(@view.validate 499).should.be.ok
      _.isUndefined(@view.validate '499.00').should.be.ok
      _.isUndefined(@view.validate '4,999.00').should.be.ok

      @view.validate(5000).should.equal 500000
      @view.validate('5000').should.equal 500000
      @view.validate('5000.00').should.equal 500000
      @view.validate('5,000.00').should.equal 500000
      @view.validate('500,000').should.equal 50000000

  describe '#displayValidationError', ->
    it 'displays the error when an invalid value is input and submitted', ->
      @view.$('.abf-validation-error').hide()
      @view.$('input').val('499')
      @view.$('form').submit()
      @view.$('.abf-validation-error').is(':visible').should.be.ok
      @view.$('button').data('state').should.equal 'error'

  describe '#submit', ->
    it 'submits the form', ->
      location.assign = sinon.stub()
      @view.$('input').val('5000')
      @view.$('form').submit()
      location.assign.args[0][0].should
        .equal "/feature/#{@auction.id}/bid/#{@saleArtwork.id}?bid=500000"

    it 'triggers sign up if not logged in', ->
      @view.user = undefined
      @view.$('form').submit()
      @triggerSpy.args[0][0].should.equal 'open:auth'
      @triggerSpy.args[0][1].mode.should.equal 'register'
      @triggerSpy.args[0][1].copy.should.equal 'Sign up to bid'
      @triggerSpy.args[0][1].redirectTo.should.equal @auction.redirectUrl(@saleArtwork.artwork())
