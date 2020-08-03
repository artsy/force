/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const sd = require("sharify").data
const FeedItem = require("../models/feed_item")
const FeedItems = require("../collections/feed_items")
const { fabricate } = require("@artsy/antigravity")

xdescribe("FeedView", function () {
  before(function (done) {
    // FIXME: Error: the string "userId is required" was thrown, throw an Error :)
    return benv.setup(() => {
      sd.APP_URL = "localhost:3004"
      sd.API_URL = "localhost:3003"

      sd.CURRENT_PATH = ""
      sd.NODE_ENV = "test"

      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")

      this.gaStub = sinon.stub()

      Backbone.$ = $
      this.partnerShow = new FeedItem(
        fabricate("show", {
          _type: "PartnerShow",
          artists: [fabricate("artist")],
          artworks: [fabricate("artwork")],
        })
      )
      this.feedItems = new FeedItems()
      this.feedItems.add(this.partnerShow)
      const FeedView = benv.requireWithJadeify(
        resolve(__dirname, "../client/feed.coffee"),
        ["feedItemsTemplate", "feedItemsContainerTemplate"]
      )
      this.view = new FeedView({
        el: $("<div class='feed'></div>"),
        feedItems: this.feedItems,
      })
      return done()
    })
  })

  after(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#initialize", () =>
    it("renders a feed", function () {
      this.view.$el.html().should.not.containEql("undefined")
      this.view.$el.html().should.not.containEql("#{")
      this.view.$el.html().should.not.containEql("NaN")

      this.view.$(".feed-item").length.should.equal(1)
      this.view
        .$(".feed-item-top-section .show-link")
        .text()
        .should.containEql(
          this.partnerShow.toChildModel().formatFeedItemHeading()
        )
      this.view
        .$(".feed-item-top-section .timeframe")
        .text()
        .should.containEql(this.partnerShow.get("location").city)
      return this.view
        .$(".artwork-item")
        .text()
        .should.containEql(this.partnerShow.get("artworks")[0].title)
    }))

  describe("#fetchMoreItems", () =>
    it("adds items to the feed", function () {
      const partnerShow = new FeedItem(
        fabricate("show", {
          _type: "PartnerShow",
          artists: [fabricate("artist")],
          artworks: [fabricate("artwork")],
        })
      )
      const response = {
        feed: "shows",
        next: "1390262261:52d09ba39c18db698900091a",
        results: [partnerShow],
      }

      this.view.fetchMoreItems()

      Backbone.sync.args[0][2].success(response)

      this.view.$(".feed-item").length.should.equal(2)

      this.view.$el.html().should.not.containEql("undefined")
      this.view.$el.html().should.not.containEql("#{")
      return this.view.$el.html().should.not.containEql("NaN")
    }))

  return describe("save buttons", function () {
    xit("able to save artworks in a post", function () {})
    return xit("able to save artworks in a show", function () {})
  })
})
