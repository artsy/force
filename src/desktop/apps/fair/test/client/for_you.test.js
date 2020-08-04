/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../../models/fair.coffee")
const Profile = require("../../../../models/profile.coffee")
const FeedItem = require("../../../../components/feed/models/feed_item.coffee")

describe("ForYouView", function () {
  before(function (done) {
    return benv.setup(() => {
      sd.API_URL = "localhost:3003"

      sd.CURRENT_PATH = ""
      sd.NODE_ENV = "test"
      sd.CURRENT_USER = { id: "foo" }
      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")
      Backbone.$ = $

      this.ForYouView = benv.require(
        resolve(__dirname, "../../client/for_you.coffee")
      )

      this.ArtworkColumnsView = sinon.stub()
      this.ArtworkColumnsView.render = sinon.stub()
      this.ArtworkColumnsView.appendArtworks = sinon.stub()
      this.ArtworkColumnsView.returns(this.ArtworkColumnsView)

      this.ForYouView.__set__("ArtworkColumnsView", this.ArtworkColumnsView)

      this.fair = new Fair(fabricate("fair"))
      this.profile = new Profile(fabricate("fair_profile"))
      return done()
    })
  })

  after(function () {
    sd.CURRENT_USER = undefined
    benv.teardown()
    return Backbone.sync.restore()
  })

  return describe("#initialize", () =>
    xit("works without a filter renders a feed", function () {
      const view = new this.ForYouView({
        el: $(`<div>
<div class='foryou-section artists'><div class='artworks'></div></div>
<div class='foryou-section partners'><div class='feed'></div></div>
<div class='foryou-section booths'></div>
</div>`),
        fair: this.fair,
        model: this.model,
      })

      const partnerShow = fabricate("show", {
        _type: "PartnerShow",
        artists: [fabricate("artist")],
        artworks: [fabricate("artwork")],
      })
      const feedItem = new FeedItem(partnerShow)

      Backbone.sync.args[0][2].success([{ artist: fabricate("artist") }])
      Backbone.sync.args[1][2].success([{ profile: fabricate("profile") }])
      Backbone.sync.args[2][2].success([])
      Backbone.sync.args[3][2].success([])
      Backbone.sync.args[4][2].success([])
      Backbone.sync.args[5][2].success([partnerShow])
      Backbone.sync.args[6][2].success([partnerShow])

      this.ArtworkColumnsView.render.should.calledOnce
      const artworks = _.last(this.ArtworkColumnsView.appendArtworks.args)[0]
      artworks.length.should.equal(1)

      view.$el.html().should.not.containEql("undefined")
      view.$el.html().should.not.containEql("#{")
      view.$el.html().should.not.containEql("NaN")

      view.$(".foryou-section.artists").length.should.equal(1)
      view.$(".foryou-section.partners .feed-item").length.should.equal(1)
      view
        .$(".foryou-section.partners .feed-item-top-section .heading")
        .text()
        .should.containEql(feedItem.toChildModel().formatFeedItemHeading())
      view
        .$(".foryou-section.partners .feed-item-top-section .timeframe")
        .text()
        .should.containEql(feedItem.get("location").city)
      return view
        .$(".foryou-section.partners .artwork-item")
        .text()
        .should.containEql(feedItem.get("artworks")[0].title)
    }))
})
