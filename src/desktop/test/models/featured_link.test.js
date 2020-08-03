/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const should = require("should")
const Backbone = require("backbone")
const FeaturedLink = require("../../models/featured_link.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("FeaturedLink", function () {
  beforeEach(function () {
    return (this.featuredLink = new FeaturedLink(
      fabricate("featured_link", {
        image_versions: ["wide", "large_rectangle", "medium_rectangle"],
      })
    ))
  })

  it("mixes in Markdown methods", function () {
    return this.featuredLink.mdToHtml.should.be.an.instanceof(Function)
  })

  xdescribe("#fetchItems", function () {})

  describe("#layoutStyle", () =>
    it("returns a descriptor for the required layout", function () {
      this.featuredLink.layoutStyle(1).should.equal("full")
      this.featuredLink.layoutStyle(2).should.equal("half")
      this.featuredLink.layoutStyle(3).should.equal("third")
      return this.featuredLink.layoutStyle(4).should.equal("quarter")
    }))

  describe("#imageSizeForLayout", () =>
    it("returns an image size by the layout", function () {
      this.featuredLink.imageSizeForLayout(1).should.equal("wide")
      this.featuredLink.imageSizeForLayout(2).should.equal("large_rectangle")
      this.featuredLink.imageSizeForLayout(3).should.equal("large_rectangle")
      return this.featuredLink
        .imageSizeForLayout(4)
        .should.equal("medium_rectangle")
    }))

  describe("#imageUrlForLayout", () =>
    it("returns the image url for the size required by the layout", function () {
      this.featuredLink.imageUrlForLayout(1).should.containEql("wide")
      this.featuredLink
        .imageUrlForLayout(2)
        .should.containEql("large_rectangle")
      this.featuredLink
        .imageUrlForLayout(3)
        .should.containEql("large_rectangle")
      return this.featuredLink
        .imageUrlForLayout(4)
        .should.containEql("medium_rectangle")
    }))

  return describe("#hasImageForLayout", () =>
    it("check for an image that matches the needed layout", function () {
      _(4).times(n => {
        return this.featuredLink.hasImageForLayout(n).should.be.true()
      })
      this.featuredLink.set("image_versions", ["wide"])
      return _(4).times(n => {
        if (n > 1) {
          this.featuredLink.hasImageForLayout(n).should.be.false()
        }
        if (n === 1) {
          return this.featuredLink.hasImageForLayout(n).should.be.true()
        }
      })
    }))
})
