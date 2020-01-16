_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
PartnerShow = require '../../../models/partner_show'
CurrentUser = require '../../../models/current_user'
rewire = require 'rewire'
FeedItem = rewire '../models/feed_item'
FeedItem.__set__ 'DOMPurify', sanitize: ->
FeedItems = require '../collections/feed_items'
FeedItems::model = FeedItem

describe 'PartnerShow', ->

  before ->
    sinon.stub Backbone, 'sync'

  after ->
    Backbone.sync.restore()

  describe '#fetchFeedItems', ->

    it "runs the success callback with our custom feed response", ->
      response =
        feed: "shows"
        next: "1390262261:52d09ba39c18db698900091a"
        response: [fabricate('show', _type: "PartnerShow")]

      feedItems = new FeedItems()
      feedItems.fetchFeedItems
        success: => feedItems.success = true

      Backbone.sync.args[0][2].success response
      feedItems.success.should.equal true

  describe '#getParams', ->

    it "valid params", ->
      new FeedItems().getParams().size.should.equal 3

  describe '#removeFlagged', ->

    beforeEach ->
      @feedItems = new FeedItems()
      @feedItems.add new FeedItem(fabricate('show',
        _type: "PartnerShow",
        flagged: true
      ))
      @feedItems.add new FeedItem(fabricate('show',
        _type: "PartnerShow",
        flagged: false
      ))
      @feedItems.add new FeedItem(fabricate('show',
        _type: "PartnerShow",
        flagged: true
        author:
          id: 'current-user-id'
      ))

    it "works without currentUser", ->
      @feedItems.length.should.equal 3
      @feedItems.removeFlagged()
      @feedItems.length.should.equal 1

    xit "includes feedItems by currentUser if they created the post", ->
      sinon.stub(CurrentUser, 'orNull').returns new CurrentUser fabricate('user', id: 'current-user-id')
      @feedItems.length.should.equal 3
      @feedItems.removeFlagged()
      @feedItems.length.should.equal 2
      CurrentUser.orNull.restore()
