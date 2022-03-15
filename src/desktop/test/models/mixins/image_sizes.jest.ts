import _ from "underscore"
// @ts-ignore
import should from "should"
import Backbone from "backbone"
const { fabricate } = require("@artsy/antigravity")
const { Image } = require("@artsy/backbone-mixins")
const { ImageSizes } = require("../../../models/mixins/image_sizes")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Image())
    _.extend(this.prototype, ImageSizes)
  }
}
Model.initClass()

describe("Image Sizes Mixin", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    // @ts-ignore
    testContext.model = new Model(fabricate("featured_link"))
  })

  describe("#publicVersions", () => {
    it("ignores the normalized (private) size", () => {
      const public_versions = testContext.model.get("image_versions")
      const copy = public_versions.slice()
      copy.push("normalized")
      testContext.model.set("image_versions", copy)
      const versions = testContext.model.publicVersions() + ""
      versions.should.equal(public_versions + "")
    })
  })

  describe("#imageUrlFor", () => {
    it("returns the next available size if the best size is not available", () => {
      testContext.model.set({
        id: "tall-image-00193920390",
        image_url: ":version.jpg",
        image_versions: ["small", "large", "larger"],
        original_height: 2253,
        original_width: 1200,
      })
      testContext.model.imageUrlFor(201, 201).should.equal("large.jpg")
    })

    it("returns the largest available image if all sizes are smaller than desired dimensions", () => {
      testContext.model.set({
        id: "tall-image-00193920390",
        image_url: ":version.jpg",
        image_versions: ["small", "large", "larger"],
        original_height: 2253,
        original_width: 1200,
      })
      testContext.model.imageUrlFor(2080, 2080).should.equal("larger.jpg")
    })
  })

  describe("#imageSizeForHeight", () => {
    it("returns a version size for a given height", () => {
      testContext.model.set({
        aspect_ratio: 0.53,
        id: "tall-@model-00193920390",
        image_url: ":version.jpg",
        image_versions: ["small", "tall", "medium", "large", "larger"],
        original_height: 2253,
        original_width: 1200,
      })
      testContext.model.imageSizeForHeight(800).should.equal("larger")
      testContext.model.imageSizeForHeight(400).should.equal("tall")
      testContext.model.imageSizeForHeight(200).should.equal("small")
    })
  })

  describe("#imageUrlForHeight", () => {
    it("returns versions for the largest image for the given height", () => {
      testContext.model.set({
        aspect_ratio: 0.53,
        id: "tall-@model-00193920390",
        image_url: ":version.jpg",
        image_versions: ["small", "tall", "medium", "large", "larger"],
        original_height: 2253,
        original_width: 1200,
      })
      testContext.model.imageUrlForHeight(100).should.equal("small.jpg")
      testContext.model.imageUrlForHeight(600).should.equal("large.jpg")
      testContext.model.imageUrlForHeight(1000).should.equal("larger.jpg")
    })
  })

  describe("#imageUrlForWidth", () => {
    it("returns versions for the largest image for the given width", () => {
      testContext.model.set({
        aspect_ratio: 0.53,
        id: "tall-image-00193920390",
        image_url: ":version.jpg",
        image_versions: ["small", "large", "larger"],
        original_height: 2253,
        original_width: 1200,
      })
      testContext.model.imageUrlForWidth(100).should.equal("small.jpg")
      testContext.model.imageUrlForWidth(300).should.equal("large.jpg")
      testContext.model.imageUrlForWidth(1000).should.equal("larger.jpg")
    })
  })

  describe("#imageUrlForMaxSize", () => {
    it("picks the last size in the list", () => {
      testContext.model.set({ image_versions: ["small", "large"] })
      testContext.model.imageUrlForMaxSize().should.equal("/bitty/large")
    })

    it("ignores the normalized (private) size", () => {
      testContext.model.set({
        image_versions: ["small", "large", "normalized"],
      })
      testContext.model.imageUrlForMaxSize().should.equal("/bitty/large")
    })

    it("favors the largest size", () => {
      testContext.model.set({ image_versions: ["larger", "large", "tall"] })
      testContext.model.imageUrlForMaxSize().should.equal("/bitty/larger")
    })
  })

  describe("#aspectRatio", () => {
    it("returns the image aspect ratio", () => {
      testContext.model.set({ aspect_ratio: 1.0 })
      testContext.model
        .aspectRatio()
        .should.equal(testContext.model.get("aspect_ratio"))
    })
  })

  describe("#resizeDimensionsFor", () => {
    it("returns new dimensions based on the passed in dimensions", () => {
      testContext.model.set({ original_height: 2253, original_width: 1200 })
      testContext.model
        .resizeDimensionsFor({ width: 400 })
        .should.eql({ height: 751, width: 400 })
      testContext.model
        .resizeDimensionsFor({ height: 400, width: 400 })
        .should.eql({ height: 400, width: 213 })
      testContext.model
        .resizeDimensionsFor({ height: 400 })
        .should.eql({ height: 400, width: 213 })
      testContext.model
        .resizeDimensionsFor({ width: 4000 })
        .should.eql({ height: 7510, width: 4000 })
      testContext.model
        .resizeDimensionsFor({ height: 4000, width: 4000 })
        .should.eql({ height: 4000, width: 2130 })
      testContext.model
        .resizeDimensionsFor({ height: 4000 })
        .should.eql({ height: 4000, width: 2130 })
    })
  })

  describe("#factor", () => {
    it("returns a value that can be multiplied into a percentage for the corresponding value at 1 (100%)", () => {
      testContext.model.set({ original_height: 2253, original_width: 1200 })
      testContext.model.factor("width").should.equal(1.877)
      testContext.model.factor("height").should.equal(0.532)
    })

    // This is a very corner case, but apparently possible
    it("returns 1 if there are no dimensions", () => {
      testContext.model.unset("original_width")
      testContext.model.unset("original_height")
      testContext.model.factor("width").should.equal(1)
    })
  })
})
