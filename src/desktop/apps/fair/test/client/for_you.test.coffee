_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
FeedItem = require '../../../../components/feed/models/feed_item.coffee'

describe 'ForYouView', ->

  before (done) ->
    benv.setup =>
      sd.API_URL = 'localhost:3003'

      sd.CURRENT_PATH = ""
      sd.NODE_ENV = "test"
      sd.CURRENT_USER = id: 'foo'
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $

      @ForYouView = benv.require resolve(__dirname, '../../client/for_you.coffee')

      @ArtworkColumnsView = sinon.stub()
      @ArtworkColumnsView.render = sinon.stub()
      @ArtworkColumnsView.appendArtworks = sinon.stub()
      @ArtworkColumnsView.returns @ArtworkColumnsView

      @ForYouView.__set__ 'ArtworkColumnsView', @ArtworkColumnsView

      @fair = new Fair fabricate 'fair'
      @profile = new Profile fabricate 'fair_profile'
      done()

  after ->
    sd.CURRENT_USER = undefined
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    xit "works without a filter renders a feed", ->
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
      Backbone.sync.args[4][2].success []
      Backbone.sync.args[5][2].success [partnerShow]
      Backbone.sync.args[6][2].success [partnerShow]

      @ArtworkColumnsView.render.should.calledOnce
      artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal 1

      view.$el.html().should.not.containEql 'undefined'
      view.$el.html().should.not.containEql "\#{"
      view.$el.html().should.not.containEql "NaN"

      view.$('.foryou-section.artists').length.should.equal 1
      view.$('.foryou-section.partners .feed-item').length.should.equal 1
      view.$('.foryou-section.partners .feed-item-top-section .heading').text().should.containEql feedItem.toChildModel().formatFeedItemHeading()
      view.$('.foryou-section.partners .feed-item-top-section .timeframe').text().should.containEql feedItem.get('location').city
      view.$('.foryou-section.partners .artwork-item').text().should.containEql feedItem.get('artworks')[0].title
