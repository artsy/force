benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
MultiPageModalView = benv.requireWithJadeify require.resolve('../view'), ['template']
config = require '../config'

describe 'MultiPageModalView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new MultiPageModalView config['auction-faqs']
    @view.render()

  it 'renders correctly', ->
    @view.$('.mpm-title').text().should.equal 'Auction FAQs'
    @view.$('.mpm-description').text().should.containEql 'Need more immediate assistance? Please contact us'
    @view.$('.mpm-nav').text().should.equal  'BiddingBuyers premium, taxes, & feesPayments and ShippingEmails and alertsConditions of sale'
    @view.$('.mpm-nav a:first').hasClass('is-active').should.be.true
    @view.$('.is-active').should.have.lengthOf 1

  describe 'clicking nav link', ->
    beforeEach ->
      sinon.spy MultiPageModalView::, 'render'

    afterEach ->
      @view.render.restore()

    it 'changes the active page', ->
      @view.render.called.should.be.false
      @view.state.get('active').should.equal 'how-auctions-work-bidding'
      @view.$('.mpm-nav a:last').click()
      @view.render.called.should.be.true
      @view.state.get('active').should.equal 'how-auctions-work-conditions-of-sale'
      @view.$('.mpm-nav a:last').hasClass('is-active').should.be.true
      @view.$('.is-active').should.have.lengthOf 1
