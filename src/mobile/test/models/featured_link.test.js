/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const FeaturedLink = require("../../models/featured_link")
const { fabricate } = require("@artsy/antigravity")

describe("FeaturedLink", function () {
  beforeEach(function () {
    return (this.link = new FeaturedLink(fabricate("featured_link")))
  })

  describe("#imageUrl", function () {
    it("returns the replaced image url", function () {
      this.link.set({
        image_url: "foo/bar/:version.jpg",
        image_versions: ["medium_rectangle"],
      })
      return this.link.imageUrl().should.equal("foo/bar/medium_rectangle.jpg")
    })

    return it("falls back to any available type if no medium_rectangle", function () {
      this.link.set({
        image_url: "foo/bar/:version.jpg",
        image_versions: ["small"],
      })
      return this.link.imageUrl().should.equal("foo/bar/small.jpg")
    })
  })

  describe("#miniSubtitle", () =>
    it("returns a split subtitle", function () {
      this.link.set("subtitle", "Arty Editorial | Featured Aug. 9th")
      return this.link.miniSubtitle().should.equal("Arty Editorial")
    }))

  return describe("#toFeaturedItem", function () {
    it("converts the link to a feature item", function () {
      this.link.set({
        href: "foo",
        title: "bar",
        subtitle: "baz",
        image_url: "qux/:version.jpg",
      })
      this.link.toFeaturedItem().href.should.equal("foo")
      this.link.toFeaturedItem().title.should.equal("<p>bar</p>\n")
      this.link.toFeaturedItem().subtitle.should.equal("<p>baz</p>")
      return this.link
        .toFeaturedItem()
        .imageUrl.should.equal("qux/large_rectangle.jpg")
    })

    return it("splits up verbose names by pipe", function () {
      this.link.set({
        href: "foo",
        title: "bar",
        subtitle: "Fooy Editorial | Featured August 6th | On the River",
        image_url: "qux",
      })
      return this.link
        .toFeaturedItem()
        .subtitle.should.equal("<p>Fooy Editorial")
    })
  })
})
