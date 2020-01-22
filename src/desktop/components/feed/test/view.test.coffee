benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
sd = require('sharify').data
FeedItem = require '../models/feed_item'
FeedItems = require '../collections/feed_items'
{ fabricate } = require '@artsy/antigravity'

xdescribe 'FeedView', ->

  before (done) ->
  # FIXME: Error: the string "userId is required" was thrown, throw an Error :)
    benv.setup =>
      sd.APP_URL = 'localhost:3004'
      sd.API_URL = 'localhost:3003'

      sd.CURRENT_PATH = ""
      sd.NODE_ENV = 'test'

      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'

      @gaStub = sinon.stub()

      Backbone.$ = $
      @partnerShow = new FeedItem fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      @feedItems = new FeedItems
      @feedItems.add @partnerShow
      FeedView = benv.requireWithJadeify resolve(__dirname, '../client/feed.coffee'), ['feedItemsTemplate', 'feedItemsContainerTemplate']
      @view = new FeedView
        el: $("<div class='feed'></div>")
        feedItems: @feedItems
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it "renders a feed", ->
      @view.$el.html().should.not.containEql 'undefined'
      @view.$el.html().should.not.containEql "\#{"
      @view.$el.html().should.not.containEql "NaN"

      @view.$('.feed-item').length.should.equal 1
      @view.$('.feed-item-top-section .show-link').text().should.containEql @partnerShow.toChildModel().formatFeedItemHeading()
      @view.$('.feed-item-top-section .timeframe').text().should.containEql @partnerShow.get('location').city
      @view.$('.artwork-item').text().should.containEql @partnerShow.get('artworks')[0].title

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

      @view.$el.html().should.not.containEql 'undefined'
      @view.$el.html().should.not.containEql "\#{"
      @view.$el.html().should.not.containEql "NaN"

  describe "save buttons", ->

    xit 'able to save artworks in a post', ->
    xit 'able to save artworks in a show', ->
