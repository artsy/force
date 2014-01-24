jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
cheerio         = require 'cheerio'
{ fabricate }   = require 'antigravity'
FeedItem        = require '../models/feed_item'
FeedItems       = require '../collections/feed_items'
sd              = require('sharify').data

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
        sd.ARTSY_URL = 'localhost:3003'
        sd.ASSET_PATH = 'assets/'
        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: [fabricate('artist')]
          artworks: [fabricate('artwork')]
        )
        @feedItems   = new FeedItems
        @feedItems.add @partnerShow
        @html    = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          maxDimension: 500
        )

      it 'Renders a feed of partner shows', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .heading').text().should.include @partnerShow.toChildModel().formatFeedItemHeading()
        $('.feed-item-top-section .timeframe').html().should.include @partnerShow.toChildModel().runningDates()
        $('.feed-item-top-section .timeframe').text().should.include @partnerShow.get('location').city
        @html.should.not.include "undefined"
        @html.should.not.include "\#{"

    describe 'in an art fair', ->
      beforeEach ->
        sd.ARTSY_URL = 'localhost:3003'
        sd.ASSET_PATH = 'assets/'
        fairLocation =
          display: 'Booth 1234'

        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: [fabricate('artist')]
          artworks: [fabricate('artwork')]
          fair_location: fairLocation
          fair: fabricate('fair', end_at: new Date())
        )
        @feedItems   = new FeedItems
        @feedItems.add @partnerShow
        @html    = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          maxDimension: 500
        )

      it 'Shows fair info', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .heading').text().should.include @partnerShow.get('fair').name
        $('.feed-item-top-section .timeframe').text().should.include @partnerShow.toChildModel().fairRunningDates()
        $('.fair-location').html().should.include @partnerShow.get('fair_location').display

        @html.should.not.include "undefined"
        @html.should.not.include "\#{"

    describe 'no artists and artworks', ->
      beforeEach ->
        sd.ARTSY_URL = 'localhost:3003'
        @partnerShow = new FeedItem fabricate('show',
          _type: "PartnerShow",
          artists: []
          artworks: []
        )
        @feedItems   = new FeedItems
        @feedItems.add @partnerShow
        @html    = render('feed_items')(
          feedItems: @feedItems.models
          fixedWidth: 1000
          maxDimension: 500
        )

      it 'Renders a feed of partner shows', ->
        $ = cheerio.load @html
        $('.feed-item').length.should.equal 1
        $('.feed-item-top-section .heading').text().should.include @partnerShow.toChildModel().formatFeedItemHeading()
        $('.feed-item-top-section .timeframe').html().should.include @partnerShow.toChildModel().runningDates()
        @html.should.not.include "undefined"
        @html.should.not.include "\#{"

  describe 'Post Feed Item', ->
    beforeEach ->
      sd.ARTSY_URL = 'localhost:3003'
      sd.CURRENT_PATH = '/post/id'
      @post = new FeedItem fabricate('post',
        _type: "Post",
      )
      @feedItems  = new FeedItems
      @feedItems.add @post
      @html      = render('feed_items')(
        feedItems: @feedItems.models
        fixedWidth: 1000
        maxDimension: 500
        sd: sd
        textColumnWidth: 404
      )

    it 'Renders a feed of partner shows', ->
      $ = cheerio.load @html
      $('.feed-item').length.should.equal 1
      @html.should.not.include "undefined"
      @html.should.not.include "\#{"
