_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
PartnerShow   = require '../../../models/partner_show'
FeedItems     = require '../collections/feed_items'

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
