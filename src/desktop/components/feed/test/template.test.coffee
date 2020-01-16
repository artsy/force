jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
_ = require 'underscore'
cheerio = require 'cheerio'
{ fabricate } = require '@artsy/antigravity'
FeedItem = require '../models/feed_item'
FeedItems = require '../collections/feed_items'
CurrentUser = require '../../../models/current_user.coffee'
sd = require('sharify').data

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Feed Templates', ->

  describe 'PartnerShow feed item', ->

    describe 'with artists and artworks', ->
      beforeEach ->
        sd.APP_URL = 'localhost:3004'
        sd.API_URL = 'localhost:3003'

        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: [fabricate('artist')]
          artworks: [fabricate('artwork')]
        )
        @feedItems = new FeedItems
        @feedItems.add @partnerShow
        @html = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          imageWidth: 500
        )

      it 'Renders a feed of partner shows', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .show-link').text().should.containEql @partnerShow.toChildModel().formatFeedItemHeading()
        $('.feed-item-top-section .timeframe').text().should.containEql @partnerShow.toChildModel().runningDates()
        $('.feed-item-top-section .timeframe').text().should.containEql @partnerShow.get('location').city
        @html.should.not.containEql "undefined"
        @html.should.not.containEql "\#{"

    describe 'in an art fair', ->
      beforeEach ->
        sd.APP_URL = 'localhost:3004'
        sd.API_URL = 'localhost:3003'

        fairLocation =
          display: 'Booth 1234'

        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: [fabricate('artist')]
          artworks: [fabricate('artwork')]
          fair_location: fairLocation
          fair: fabricate('fair', end_at: new Date())
        )
        @feedItems = new FeedItems
        @feedItems.add @partnerShow
        @html = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          imageWidth: 500
        )

      it 'Shows fair info', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .feed-item-fair-name').text().should.containEql @partnerShow.get('fair').name
        $('.feed-item-top-section .fair-location').text().should.containEql 'New York – Booth 1234'
        $('.fair-location').html().should.containEql @partnerShow.get('fair_location').display

        @html.should.not.containEql "undefined"
        @html.should.not.containEql "\#{"

    describe 'no artists and artworks', ->
      beforeEach ->
        sd.APP_URL = 'localhost:3004'
        sd.API_URL = 'localhost:3003'
        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: []
          artworks: []
        )
        @feedItems = new FeedItems
        @feedItems.add @partnerShow
        @html = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          imageWidth: 500
        )

      it 'Renders a feed of partner shows', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .show-link').text().should.containEql @partnerShow.toChildModel().formatFeedItemHeading()
        $('.feed-item-top-section .timeframe').text().should.containEql @partnerShow.toChildModel().runningDates()
        @html.should.not.containEql "undefined"
        @html.should.not.containEql "\#{"
