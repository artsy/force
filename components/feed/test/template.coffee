jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
_               = require 'underscore'
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
        attachments: [
          {
            id: _.uniqueId()
            oembed_json:
              author_name: "Arts at MIT"
              author_url: "http://www.youtube.com/user/ArtsMITEdu"
              description: "The MIT Visiting Artists Program "
              height: 338
              html: "<iframe></iframe>"
              provider_name: "YouTube"
              provider_url: "http://www.youtube.com/"
              thumbnail_height: 360
              thumbnail_url: "http://i1.ytimg.com/vi/d7zaja7ytWI/hqdefault.jpg"
              thumbnail_width: 480
              title: "MIT Visiting Artists Program"
              type: "video"
              url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
              version: "1.0"
              width: 600
            oembed_status: "success"
            position: 1
            type: "PostLink"
            url: "http://www.youtube.com/watch?v=d7zaja7ytWI"
          }, {
            id: _.uniqueId()
            html: "<iframe></iframe>"
            position: 2
            sanitized_html: "<iframe></iframe>"
            type: "PostEmbed"
          }, {
            id: _.uniqueId()
            position: 3
            type: "PostArtwork"
            artwork: fabricate('artwork')
          }, {
            aspect_ratio: 1.03
            id: _.uniqueId()
            image_url: "http://static0.artsy.net/post_images/52e04ab39acc8aa27e000267/:version.jpg"
            image_versions: ['medium_rectangle', 'large_rectangle', 'small', 'large', 'larger']
            original_height: 1648
            original_width: 1703
            position: 4
            type: "PostImage"
          }
        ]
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

    it 'Renders a feed of posts', ->
      $ = cheerio.load @html
      $('.feed-item').length.should.equal 1
      $('.feed-right-column section.post-media').length.should.equal 1

      # PostImage
      $('.feed-right-column figure.post-image').length.should.equal 1

      # PostArtwork
      $('.feed-right-column figure.artwork-item').length.should.equal 1

      # PostEmbed
      $('.feed-right-column figure.post-embed').length.should.equal 1

      # PostLink
      $('.feed-right-column figure.video-link').length.should.equal 1

      @html.should.not.include "undefined"
      @html.should.not.include "\#{"
