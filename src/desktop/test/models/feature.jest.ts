import _ from "underscore"
import sinon from "sinon"
import Backbone from "backbone"
const Feature = require("../../models/feature.coffee")
import { fabricate } from "@artsy/antigravity"

describe("Feature", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.feature = new Feature(fabricate("feature"))
    sinon.stub(Backbone, "sync")
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#hasImage", () => {
    it("returns false if version not there", () => {
      testContext.feature.set({ image_versions: [] })
      testContext.feature.hasImage("wide").should.not.be.ok()
    })
  })

  describe("#fetchSets", () => {
    it("collects the sets and items", done => {
      testContext.feature.fetchSets({
        success(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          done()
        },
      })

      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("set", { id: "abc", name: "Explore this bidness" }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([])
    })

    it("callsback when the sets are fetched", done => {
      testContext.feature.fetchSets({
        setsSuccess(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          done()
        },
      })

      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("set", { id: "abc", name: "Explore this bidness" }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([])
    })

    it("callsback when the artworks are fetched page and success", done => {
      const successStub = sinon.stub()
      const sale = fabricate("sale")

      testContext.feature.fetchSets({
        artworkPageSuccess: successStub,
        artworksSuccess: saleFeaturedSet => {
          successStub.called.should.be.ok()
          saleFeaturedSet.get("type").should.equal("artworks")
          testContext.feature.get("sale").id.should.equal(sale.id)
          done()
        },
      })

      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("set", {
          id: "abc",
          item_type: "Sale",
          name: "Explore this bidness",
        }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([sale])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([])
    })

    it("fetches until end for sets whose items are featured links", done => {
      testContext.feature.fetchSets({
        success(sets) {
          sets[0].get("type").should.equal("featured links")
          sets[0].get("name").should.equal("Explore this bidness top")
          sets[0]
            .get("data")
            .first()
            .get("title")
            .should.equal("Featured link for this awesome page")
          sets[0].get("data").should.have.lengthOf(12)
          done()
        },
      })

      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("set", {
          id: "def",
          key: "0hello",
          name: "Explore this bidness top",
        }),
      ])

      // @ts-expect-error STRICT_NULL_CHECK
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
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
        fabricate("featured_link", {
          title: "Featured link for this awesome page",
        }),
      ])
      // @ts-expect-error STRICT_NULL_CHECK
      _.last(Backbone.sync.args)[2].success([])
    })

    xit("sorts sets by key", function () {})

    xdescribe("fetching a sale", () => {
      it("proxies the display_artist_list attribute", () => {})
    })
  })

  describe("#shareTitle", () => {
    it("returns the name, a link, and truncates to a tweet", () => {
      const shareThis = testContext.feature.shareTitle()
      shareThis.should.containEql(testContext.feature.get("name"))
      shareThis.should.containEql("on Artsy")
      shareThis.should.containEql(testContext.feature.href())
    })
  })

  describe("#metaDescription", () => {
    it("Strips markdown in the description", () => {
      testContext.feature.set({
        description:
          "**Children’s Museum of the Arts’ Art Auction** All proceeds support CMA’s Community Programs. To purchase tickets, click [here](http://cmany.org/events/art-auction/)!]",
      })
    })
  })
})
