/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const Feature = require("../../models/feature.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("Feature", function () {
  beforeEach(function () {
    this.feature = new Feature(fabricate("feature"))
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#hasImage", () =>
    it("returns false if version not there", function () {
      this.feature.set({ image_versions: [] })
      return this.feature.hasImage("wide").should.not.be.ok()
    }))

  describe("#fetchSets", function () {
    it("collects the sets and items", function (done) {
      this.feature.fetchSets({
        success(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          return done()
        },
      })

      _.last(Backbone.sync.args)[2].success([
        fabricate("set", { name: "Explore this bidness", id: "abc" }),
      ])
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      return _.last(Backbone.sync.args)[2].success([])
    })

    it("callsback when the sets are fetched", function (done) {
      this.feature.fetchSets({
        setsSuccess(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          return done()
        },
      })

      _.last(Backbone.sync.args)[2].success([
        fabricate("set", { name: "Explore this bidness", id: "abc" }),
      ])
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      return _.last(Backbone.sync.args)[2].success([])
    })

    it("callsback when the artworks are fetched page and success", function (done) {
      const successStub = sinon.stub()
      const sale = fabricate("sale")

      this.feature.fetchSets({
        artworkPageSuccess: successStub,
        artworksSuccess: saleFeaturedSet => {
          successStub.called.should.be.ok()
          saleFeaturedSet.get("type").should.equal("artworks")
          this.feature.get("sale").id.should.equal(sale.id)
          return done()
        },
      })

      _.last(Backbone.sync.args)[2].success([
        fabricate("set", {
          name: "Explore this bidness",
          id: "abc",
          item_type: "Sale",
        }),
      ])
      _.last(Backbone.sync.args)[2].success([sale])
      return _.last(Backbone.sync.args)[2].success([])
    })

    it("fetches until end for sets whose items are featured links", function (done) {
      this.feature.fetchSets({
        success(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness top")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          sets[0].get("data").should.have.lengthOf(12)
          return done()
        },
      })

      _.last(Backbone.sync.args)[2].success([
        fabricate("set", {
          name: "Explore this bidness top",
          key: "0hello",
          id: "def",
        }),
      ])

      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      return _.last(Backbone.sync.args)[2].success([])
    })

    xit("sorts sets by key", function () {})

    return xdescribe("fetching a sale", () =>
      it("proxies the display_artist_list attribute", function () {}))
  })

  describe("#shareTitle", () =>
    it("returns the name, a link, and truncates to a tweet", function () {
      const shareThis = this.feature.shareTitle()
      shareThis.should.containEql(this.feature.get("name"))
      shareThis.should.containEql("on Artsy")
      return shareThis.should.containEql(this.feature.href())
    }))

  return describe("#metaDescription", () =>
    it("Strips markdown in the description", function () {
      return this.feature.set({
        description:
          "**Children’s Museum of the Arts’ Art Auction** All proceeds support CMA’s Community Programs. To purchase tickets, click [here](http://cmany.org/events/art-auction/)!]",
      })
    }))
})
