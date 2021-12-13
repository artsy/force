import _ from "underscore"
import { FeaturedLink } from "../../models/featured_link"
import { fabricate } from "@artsy/antigravity"

describe("FeaturedLink", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.featuredLink = new FeaturedLink(
      // @ts-ignore
      fabricate("featured_link", {
        image_versions: ["wide", "large_rectangle", "medium_rectangle"],
      })
    )
  })

  it("mixes in Markdown methods", () => {
    testContext.featuredLink.mdToHtml.should.be.an.instanceof(Function)
  })

  describe.skip("#fetchItems", function () {})

  describe("#layoutStyle", () => {
    it("returns a descriptor for the required layout", () => {
      testContext.featuredLink.layoutStyle(1).should.equal("full")
      testContext.featuredLink.layoutStyle(2).should.equal("half")
      testContext.featuredLink.layoutStyle(3).should.equal("third")
      testContext.featuredLink.layoutStyle(4).should.equal("quarter")
    })
  })

  describe("#imageSizeForLayout", () => {
    it("returns an image size by the layout", () => {
      testContext.featuredLink.imageSizeForLayout(1).should.equal("wide")
      testContext.featuredLink
        .imageSizeForLayout(2)
        .should.equal("large_rectangle")
      testContext.featuredLink
        .imageSizeForLayout(3)
        .should.equal("large_rectangle")
      testContext.featuredLink
        .imageSizeForLayout(4)
        .should.equal("medium_rectangle")
    })
  })

  describe("#imageUrlForLayout", () => {
    it("returns the image url for the size required by the layout", () => {
      testContext.featuredLink.imageUrlForLayout(1).should.containEql("wide")
      testContext.featuredLink
        .imageUrlForLayout(2)
        .should.containEql("large_rectangle")
      testContext.featuredLink
        .imageUrlForLayout(3)
        .should.containEql("large_rectangle")
      testContext.featuredLink
        .imageUrlForLayout(4)
        .should.containEql("medium_rectangle")
    })
  })

  describe("#hasImageForLayout", () => {
    it("check for an image that matches the needed layout", () => {
      _(4).times(n => {
        testContext.featuredLink.hasImageForLayout(n).should.be.true()
      })
      testContext.featuredLink.set("image_versions", ["wide"])
      _(4).times(n => {
        if (n > 1) {
          testContext.featuredLink.hasImageForLayout(n).should.be.false()
        }
        if (n === 1) {
          testContext.featuredLink.hasImageForLayout(n).should.be.true()
        }
      })
    })
  })
})
