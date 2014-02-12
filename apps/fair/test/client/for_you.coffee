sd            = require('sharify').data
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'
Fair          = require '../../../../models/fair.coffee'
Profile       = require '../../../../models/profile.coffee'
FeedItem      = require '../../../../components/feed/models/feed_item.coffee'

describe 'ForYouView', ->

  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      sd.CURRENT_PATH = ""
      sd.NODE_ENV = "test"
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$  = $

      @ForYouView = benv.require resolve(__dirname, '../../client/for_you.coffee')
      @ForYouView.__set__ 'FeedView', benv.requireWithJadeify resolve(__dirname, '../../../../components/feed/client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']

      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it "works without a filter renders a feed", ->
      view = new @ForYouView
        el: $("<div><div class='foryou-section partners'><div class='feed'></div></div><div class='foryou-section booths'><div class='feed'></div></div></div>")
        fair: @fair
        model: @model
        filter: {}

      partnerShow = fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      feedItem = new FeedItem partnerShow

      Backbone.sync.args[0][2].success [{profile: fabricate 'profile'}]
      Backbone.sync.args[1][2].success [partnerShow]
      Backbone.sync.args[2][2].success []
      Backbone.sync.args[3][2].success [partnerShow]

      view.$el.html().should.not.include 'undefined'
      view.$el.html().should.not.include "\#{"
      view.$el.html().should.not.include "NaN"

      view.$('.foryou-section.partners .feed-item').length.should.equal 1
      view.$('.foryou-section.partners .feed-item-top-section .heading').text().should.include feedItem.toChildModel().formatFeedItemHeading()
      view.$('.foryou-section.partners .feed-item-top-section .timeframe').text().should.include feedItem.get('location').city
      view.$('.foryou-section.partners .artwork-item').text().should.include feedItem.get('artworks')[0].title

      view.$('.foryou-section.booths .feed-item').length.should.equal 1
      view.$('.foryou-section.booths .feed-item-top-section .heading').text().should.include feedItem.toChildModel().formatFeedItemHeading()
      view.$('.foryou-section.booths .feed-item-top-section .timeframe').text().should.include feedItem.get('location').city
      view.$('.foryou-section.booths .artwork-item').text().should.include feedItem.get('artworks')[0].title
