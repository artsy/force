sd            = require('sharify').data
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'
Fair          = require '../../../../models/fair.coffee'
Profile       = require '../../../../models/profile.coffee'
FeedItem      = require '../../../../components/feed/models/feed_item.coffee'

describe 'BoothsView', ->

  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      sd.CURRENT_PATH = ""
      sd.NODE_ENV = "test"
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$  = $

      @BoothsView = benv.require resolve(__dirname, '../../client/booths.coffee')
      @BoothsView.__set__ 'FeedView', benv.requireWithJadeify resolve(__dirname, '../../../../components/feed/client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']

      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it "works without a filter renders a feed", ->
      view = new @BoothsView
        el: $("<div><h1></h1><div class='feed'></div></div>")
        fair: @fair
        model: @model
        filter: {}

      partnerShow = fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      feedItem = new FeedItem partnerShow

      Backbone.sync.args[0][2].success [partnerShow]

      view.$el.html().should.not.include 'undefined'
      view.$el.html().should.not.include "\#{"
      view.$el.html().should.not.include "NaN"

      view.$('h1').text().should.equal 'All Exhibitors'
      view.$('.feed-item').length.should.equal 1
      view.$('.feed-item-top-section .heading').text().should.include feedItem.toChildModel().formatFeedItemHeading()
      view.$('.feed-item-top-section .timeframe').text().should.include feedItem.get('location').city
      view.$('.artwork-item').text().should.include feedItem.get('artworks')[0].title

    # Can't get 2 of these to work in the same test
    xit "works with a filter renders a feed", ->
      view = new @BoothsView
        el: $("<div><h1></h1><div class='feed'></div></div>")
        fair: @fair
        model: @model
        filter: { section: 'Awesome Section' }

      partnerShow = fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      feedItem = new FeedItem partnerShow

      Backbone.sync.args[0][2].success [partnerShow]

      view.$el.html().should.not.include 'undefined'
      view.$el.html().should.not.include "\#{"
      view.$el.html().should.not.include "NaN"

      view.$('h1').text().should.equal 'Exhibitors at Awesome Section'
      view.$('.feed-item').length.should.equal 1
      view.$('.feed-item-top-section .heading').text().should.include feedItem.toChildModel().formatFeedItemHeading()
      view.$('.feed-item-top-section .timeframe').text().should.include feedItem.get('location').city
      view.$('.artwork-item').text().should.include feedItem.get('artworks')[0].title

  it 'renders the num of showing exhibitors'
  it 'can be sorted'
  it 'will switch the the a-z view'
