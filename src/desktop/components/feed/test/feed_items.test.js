/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
let Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const sd = require("sharify").data
const should = require("should")
Backbone = require("backbone")
const PartnerShow = require("../../../models/partner_show")
const CurrentUser = require("../../../models/current_user")
const rewire = require("rewire")
const FeedItem = rewire("../models/feed_item")
FeedItem.__set__("DOMPurify", { sanitize() {} })
const FeedItems = require("../collections/feed_items")
FeedItems.prototype.model = FeedItem

describe("PartnerShow", function () {
  before(() => sinon.stub(Backbone, "sync"))

  after(() => Backbone.sync.restore())

  describe("#fetchFeedItems", () =>
    it("runs the success callback with our custom feed response", function () {
      const response = {
        feed: "shows",
        next: "1390262261:52d09ba39c18db698900091a",
        response: [fabricate("show", { _type: "PartnerShow" })],
      }

      const feedItems = new FeedItems()
      feedItems.fetchFeedItems({
        success: () => {
          return (feedItems.success = true)
        },
      })

      Backbone.sync.args[0][2].success(response)
      return feedItems.success.should.equal(true)
    }))

  describe("#getParams", () =>
    it("valid params", () => new FeedItems().getParams().size.should.equal(3)))

  return describe("#removeFlagged", function () {
    beforeEach(function () {
      this.feedItems = new FeedItems()
      this.feedItems.add(
        new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            flagged: true,
          })
        )
      )
      this.feedItems.add(
        new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            flagged: false,
          })
        )
      )
      return this.feedItems.add(
        new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            flagged: true,
            author: {
              id: "current-user-id",
            },
          })
        )
      )
    })

    it("works without currentUser", function () {
      this.feedItems.length.should.equal(3)
      this.feedItems.removeFlagged()
      return this.feedItems.length.should.equal(1)
    })

    return xit("includes feedItems by currentUser if they created the post", function () {
      sinon
        .stub(CurrentUser, "orNull")
        .returns(new CurrentUser(fabricate("user", { id: "current-user-id" })))
      this.feedItems.length.should.equal(3)
      this.feedItems.removeFlagged()
      this.feedItems.length.should.equal(2)
      return CurrentUser.orNull.restore()
    })
  })
})
