benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
{ resolve }   = require 'path'
FeedView      = benv.requireWithJadeify resolve(__dirname, '../client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']
sd            = require('sharify').data
FeedItem      = require '../models/feed_item'
FeedItems     = require '../collections/feed_items'
{ fabricate } = require 'antigravity'

describe 'FeedView', ->

  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$  = $
      @partnerShow = new FeedItem fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      @feedItems = new FeedItems
      @feedItems.add @partnerShow
      @view = new FeedView.FeedView
        el: $("<div class='feed'></div>")
        feedItems: @feedItems
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it "renders a feed", ->
      @view.$el.html().should.not.include 'undefined'
      @view.$el.html().should.not.include "\#{"
      @view.$el.html().should.not.include "NaN"

      @view.$('.feed-item').length.should.equal 1
      @view.$('.feed-item-top-section .heading').text().should.include @partnerShow.toChildModel().formatFeedItemHeading()
      @view.$('.feed-item-top-section .timeframe').text().should.include @partnerShow.get('location').city
      @view.$('.artwork-item').text().should.include @partnerShow.get('artworks')[0].title

  describe '#fetchMoreItems', ->

    it 'adds items to the feed', ->
      partnerShow = new FeedItem fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      response =
        feed: "shows"
        next: "1390262261:52d09ba39c18db698900091a"
        results: [partnerShow]

      @view.fetchMoreItems()

      Backbone.sync.args[0][2].success response

      @view.$('.feed-item').length.should.equal 2

      @view.$el.html().should.not.include 'undefined'
      @view.$el.html().should.not.include "\#{"
      @view.$el.html().should.not.include "NaN"
