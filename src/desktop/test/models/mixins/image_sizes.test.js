/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const { Image } = require("artsy-backbone-mixins")
const ImageSizes = require("../../../models/mixins/image_sizes")
const sd = require("sharify").data

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Image())
    _.extend(this.prototype, ImageSizes)
  }
}
Model.initClass()

describe("Image Sizes Mixin", function () {
  beforeEach(function () {
    return (this.model = new Model(fabricate("featured_link")))
  })

  describe("#publicVersions", () =>
    it("ignores the normalized (private) size", function () {
      const public_versions = this.model.get("image_versions")
      const copy = public_versions.slice()
      copy.push("normalized")
      this.model.set("image_versions", copy)
      return (this.model.publicVersions() + "").should.equal(
        public_versions + ""
      )
    }))

  describe("#imageUrlFor", function () {
    it("returns the next available size if the best size is not available", function () {
      this.model.set({
        id: "tall-image-00193920390",
        image_versions: ["small", "large", "larger"],
        image_url: ":version.jpg",
        original_height: 2253,
        original_width: 1200,
      })
      return this.model.imageUrlFor(201, 201).should.equal("large.jpg")
    })

    return it("returns the largest available image if all sizes are smaller than desired dimensions", function () {
      this.model.set({
        id: "tall-image-00193920390",
        image_versions: ["small", "large", "larger"],
        image_url: ":version.jpg",
        original_height: 2253,
        original_width: 1200,
      })
      return this.model.imageUrlFor(2080, 2080).should.equal("larger.jpg")
    })
  })

  describe("#imageSizeForHeight", () =>
    it("returns a version size for a given height", function () {
      this.model.set({
        id: "tall-@model-00193920390",
        image_versions: ["small", "tall", "medium", "large", "larger"],
        image_url: ":version.jpg",
        aspect_ratio: 0.53,
        original_height: 2253,
        original_width: 1200,
      })
      this.model.imageSizeForHeight(800).should.equal("larger")
      this.model.imageSizeForHeight(400).should.equal("tall")
      return this.model.imageSizeForHeight(200).should.equal("small")
    }))

  describe("#imageUrlForHeight", () =>
    it("returns versions for the largest image for the given height", function () {
      this.model.set({
        id: "tall-@model-00193920390",
        image_versions: ["small", "tall", "medium", "large", "larger"],
        image_url: ":version.jpg",
        aspect_ratio: 0.53,
        original_height: 2253,
        original_width: 1200,
      })
      this.model.imageUrlForHeight(100).should.equal("small.jpg")
      this.model.imageUrlForHeight(600).should.equal("large.jpg")
      return this.model.imageUrlForHeight(1000).should.equal("larger.jpg")
    }))

  describe("#imageUrlForWidth", () =>
    it("returns versions for the largest image for the given width", function () {
      this.model.set({
        id: "tall-image-00193920390",
        image_versions: ["small", "large", "larger"],
        image_url: ":version.jpg",
        aspect_ratio: 0.53,
        original_height: 2253,
        original_width: 1200,
      })
      this.model.imageUrlForWidth(100).should.equal("small.jpg")
      this.model.imageUrlForWidth(300).should.equal("large.jpg")
      return this.model.imageUrlForWidth(1000).should.equal("larger.jpg")
    }))

  describe("#imageUrlForMaxSize", function () {
    it("picks the last size in the list", function () {
      this.model.set({ image_versions: ["small", "large"] })
      return this.model.imageUrlForMaxSize().should.equal("/bitty/large")
    })

    it("ignores the normalized (private) size", function () {
      this.model.set({ image_versions: ["small", "large", "normalized"] })
      return this.model.imageUrlForMaxSize().should.equal("/bitty/large")
    })

    return it("favors the largest size", function () {
      this.model.set({ image_versions: ["larger", "large", "tall"] })
      return this.model.imageUrlForMaxSize().should.equal("/bitty/larger")
    })
  })

  describe("#aspectRatio", () =>
    it("returns the image aspect ratio", function () {
      this.model.set({ aspect_ratio: 1.0 })
      return this.model
        .aspectRatio()
        .should.equal(this.model.get("aspect_ratio"))
    }))

  describe("#resizeDimensionsFor", () =>
    it("returns new dimensions based on the passed in dimensions", function () {
      this.model.set({ original_height: 2253, original_width: 1200 })
      this.model
        .resizeDimensionsFor({ width: 400 })
        .should.eql({ width: 400, height: 751 })
      this.model
        .resizeDimensionsFor({ width: 400, height: 400 })
        .should.eql({ width: 213, height: 400 })
      this.model
        .resizeDimensionsFor({ height: 400 })
        .should.eql({ width: 213, height: 400 })
      this.model
        .resizeDimensionsFor({ width: 4000 })
        .should.eql({ width: 4000, height: 7510 })
      this.model
        .resizeDimensionsFor({ width: 4000, height: 4000 })
        .should.eql({ width: 2130, height: 4000 })
      return this.model
        .resizeDimensionsFor({ height: 4000 })
        .should.eql({ width: 2130, height: 4000 })
    }))

  return describe("#factor", function () {
    it("returns a value that can be multiplied into a percentage for the corresponding value at 1 (100%)", function () {
      this.model.set({ original_height: 2253, original_width: 1200 })
      this.model.factor("width").should.equal(1.877)
      return this.model.factor("height").should.equal(0.532)
    })

    // This is a very corner case, but apparently possible
    return it("returns 1 if there are no dimensions", function () {
      this.model.unset("original_width")
      this.model.unset("original_height")
      return this.model.factor("width").should.equal(1)
    })
  })
})
