_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

RelatedAuctionResultsView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'RelatedAuctionResultsView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    RelatedAuctionResultsView.__set__ 'mediator', { trigger: @triggerStub = sinon.stub() }
    @view = new RelatedAuctionResultsView
      amount: 4
      artistId: 'foo-bar'
    Backbone.sync.args[0][2].success [
      fabricate 'auction_result'
      fabricate 'auction_result'
    ]
    done()

  afterEach ->
    RelatedAuctionResultsView.__get__ 'mediator'
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the results', ->
      @view.$('.related-auction-result').length.should.equal 2
      @view.$('.rar-thumbnail img').attr('src').should.equal 'http://static1.artsy.net/auction_lots/51d041844c91c616610005a0/original.jpg'
      @view.$('.rar-title').first().text().should.equal 'MADONNA PAINTING (1985)'

    it 'does not have the price for logged out users', ->
      @view.user = null
      @view.render()
      @view.$('.rar-price').length.should.equal 0

    it 'has the price if you are logged in', ->
      @view.user = 'existy'
      @view.render()
      @view.$('.rar-price').length.should.equal 2

  describe '#clickResult', ->
    it 'triggers a modal for logged out users', ->
      @view.user = null
      @view.$('.related-auction-result').first().click()
      @triggerStub.called.should.be.ok
      @triggerStub.args[0][0].should.equal 'open:auth'
      @triggerStub.args[0][1].copy.should.equal 'Sign up to see full auction records — for free'

    it 'is normal click for logged in users', ->
      @view.user = 'existy'
      @view.$('.related-auction-result').first().click()
      @triggerStub.called.should.not.be.ok
