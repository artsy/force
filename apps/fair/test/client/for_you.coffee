_             = require 'underscore'
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
      sd.CURRENT_USER = true
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$  = $

      @ForYouView = benv.require resolve(__dirname, '../../client/for_you.coffee')
      @ForYouView.__set__ 'FeedView', benv.requireWithJadeify resolve(__dirname, '../../../../components/feed/client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']

      @SuggestedGenesView = sinon.stub()
      @SuggestedGenesView.render = sinon.stub()
      @SuggestedGenesView.returns @SuggestedGenesView

      @ArtworkColumnsView = sinon.stub()
      @ArtworkColumnsView.render = sinon.stub()
      @ArtworkColumnsView.appendArtworks = sinon.stub()
      @ArtworkColumnsView.returns @ArtworkColumnsView

      @ForYouView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView

      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()
    sd.CURRENT_USER = false

  describe '#initialize', ->

    it "works without a filter renders a feed", ->
      view = new @ForYouView
        el: $("""<div>
            <div class='foryou-section artists'><div class='artworks'></div></div>
            <div class='foryou-section partners'><div class='feed'></div></div>
            <div class='foryou-section booths'></div>
            </div>""")
        fair: @fair
        model: @model

      partnerShow = fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      feedItem = new FeedItem partnerShow

      Backbone.sync.args[0][2].success [{artist: fabricate('artist')}]
      Backbone.sync.args[1][2].success [{profile: fabricate 'profile'}]
      Backbone.sync.args[2][2].success []
      Backbone.sync.args[3][2].success []
      Backbone.sync.args[4][2].success [partnerShow]
      Backbone.sync.args[5][2].success [partnerShow]

      @ArtworkColumnsView.render.should.calledOnce
      artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
      artworks.should.have.lengthOf 1

      view.$el.html().should.not.include 'undefined'
      view.$el.html().should.not.include "\#{"
      view.$el.html().should.not.include "NaN"

      view.$('.foryou-section.artists').length.should.equal 1
      view.$('.foryou-section.partners .feed-item').length.should.equal 1
      view.$('.foryou-section.partners .feed-item-top-section .heading').text().should.include feedItem.toChildModel().formatFeedItemHeading()
      view.$('.foryou-section.partners .feed-item-top-section .timeframe').text().should.include feedItem.get('location').city
      view.$('.foryou-section.partners .artwork-item').text().should.include feedItem.get('artworks')[0].title
