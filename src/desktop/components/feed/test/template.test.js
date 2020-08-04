/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const _ = require("underscore")
const cheerio = require("cheerio")
const { fabricate } = require("@artsy/antigravity")
const FeedItem = require("../models/feed_item")
const FeedItems = require("../collections/feed_items")
const CurrentUser = require("../../../models/current_user.coffee")
const sd = require("sharify").data

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Feed Templates", () =>
  describe("PartnerShow feed item", function () {
    describe("with artists and artworks", function () {
      beforeEach(function () {
        sd.APP_URL = "localhost:3004"
        sd.API_URL = "localhost:3003"

        this.partnerShow = new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            artists: [fabricate("artist")],
            artworks: [fabricate("artwork")],
          })
        )
        this.feedItems = new FeedItems()
        this.feedItems.add(this.partnerShow)
        return (this.html = render("feed_items")({
          feedItems: this.feedItems.models,
          fixedWidth: 1000,
          imageWidth: 500,
        }))
      })

      return it("Renders a feed of partner shows", function () {
        const $ = cheerio.load(this.html)
        $(".feed-item").length.should.equal(1)
        $(".feed-item-top-section .show-link")
          .text()
          .should.containEql(
            this.partnerShow.toChildModel().formatFeedItemHeading()
          )
        $(".feed-item-top-section .timeframe")
          .text()
          .should.containEql(this.partnerShow.toChildModel().runningDates())
        $(".feed-item-top-section .timeframe")
          .text()
          .should.containEql(this.partnerShow.get("location").city)
        this.html.should.not.containEql("undefined")
        return this.html.should.not.containEql("#{")
      })
    })

    describe("in an art fair", function () {
      beforeEach(function () {
        sd.APP_URL = "localhost:3004"
        sd.API_URL = "localhost:3003"

        const fairLocation = { display: "Booth 1234" }

        this.partnerShow = new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            artists: [fabricate("artist")],
            artworks: [fabricate("artwork")],
            fair_location: fairLocation,
            fair: fabricate("fair", { end_at: new Date() }),
          })
        )
        this.feedItems = new FeedItems()
        this.feedItems.add(this.partnerShow)
        return (this.html = render("feed_items")({
          feedItems: this.feedItems.models,
          fixedWidth: 1000,
          imageWidth: 500,
        }))
      })

      return it("Shows fair info", function () {
        const $ = cheerio.load(this.html)
        $(".feed-item").length.should.equal(1)
        $(".feed-item-top-section .feed-item-fair-name")
          .text()
          .should.containEql(this.partnerShow.get("fair").name)
        $(".feed-item-top-section .fair-location")
          .text()
          .should.containEql("New York – Booth 1234")
        $(".fair-location")
          .html()
          .should.containEql(this.partnerShow.get("fair_location").display)

        this.html.should.not.containEql("undefined")
        return this.html.should.not.containEql("#{")
      })
    })

    return describe("no artists and artworks", function () {
      beforeEach(function () {
        sd.APP_URL = "localhost:3004"
        sd.API_URL = "localhost:3003"
        this.partnerShow = new FeedItem(
          fabricate("show", {
            _type: "PartnerShow",
            artists: [],
            artworks: [],
          })
        )
        this.feedItems = new FeedItems()
        this.feedItems.add(this.partnerShow)
        return (this.html = render("feed_items")({
          feedItems: this.feedItems.models,
          fixedWidth: 1000,
          imageWidth: 500,
        }))
      })

      return it("Renders a feed of partner shows", function () {
        const $ = cheerio.load(this.html)
        $(".feed-item").length.should.equal(1)
        $(".feed-item-top-section .show-link")
          .text()
          .should.containEql(
            this.partnerShow.toChildModel().formatFeedItemHeading()
          )
        $(".feed-item-top-section .timeframe")
          .text()
          .should.containEql(this.partnerShow.toChildModel().runningDates())
        this.html.should.not.containEql("undefined")
        return this.html.should.not.containEql("#{")
      })
    })
  }))
