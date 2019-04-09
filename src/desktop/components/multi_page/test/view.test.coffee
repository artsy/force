_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
MultiPageView = benv.requireWithJadeify require.resolve('../view'), ['template']
config = require '../config'

describe 'MultiPageView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new MultiPageView config['auction-faqs']
    @view.render()

  it 'renders correctly', ->
    @view.$('.mpv-title').text().should.equal 'Auction FAQs'
    @view.$('.mpv-description').text().should.containEql 'Need more immediate assistance? Please contact us'
    @view.$('.mpv-nav').text().should.equal  'BiddingBuyers premium, taxes, & feesPayments and ShippingEmails and alertsConditions of sale'
    @view.$('.mpv-nav a:first').hasClass('is-active').should.be.true()
    @view.$('.is-active').should.have.lengthOf 1

  describe 'clicking nav link', ->
    it 'changes the active page', ->
      @view.state.get('active').should.equal 'how-auctions-work-bidding'
      @view.$('.mpv-nav a:last').click()
      @view.state.get('active').should.equal 'how-auctions-work-conditions-of-sale'
      @view.$('.mpv-nav a:last').hasClass('is-active').should.be.true()
      @view.$('.is-active').should.have.lengthOf 1

  describe 'defaultPageId', ->
    it 'displays default page when a defaultPageId is passed', ->
      options = _.extend(config['collector-faqs'], { defaultPageId: 'collector-faqs-selling-on-artsy' })
      view = new MultiPageView options
      view.render()

      view.state.get('active').should.equal 'collector-faqs-selling-on-artsy'
      view.$('.mpv-nav a:last').hasClass('is-active').should.be.true()
      view.$('.is-active').should.have.lengthOf 1
