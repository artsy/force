/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const DeepZoom = require("../mixin")
const { Image } = require("artsy-backbone-mixins")

const SECURE_IMAGES_URL = "https://supersecure.foo.bar"
class NotReallyAnArtworkImage extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, DeepZoom(SECURE_IMAGES_URL))
  }
}
NotReallyAnArtworkImage.initClass()

class NotReallyAnArtworkImage1 extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, DeepZoom(null))
  }
}
NotReallyAnArtworkImage1.initClass()

describe("Deep Zoom mixin", function () {
  describe("secure", function () {
    before(function () {
      return (this.SECURE_IMAGES_URL = SECURE_IMAGES_URL)
    })

    beforeEach(function () {
      return (this.image = new NotReallyAnArtworkImage(
        fabricate("artwork_image")
      ))
    })

    return describe("#canDeepZoom", function () {
      it("should be deep-zoomable if *all* the deep zoom attributes are present", function () {
        this.image.canDeepZoom().should.be.ok()
        const deepZoomAttrs = [
          "tile_base_url",
          "tile_size",
          "tile_overlap",
          "tile_format",
          "max_tiled_height",
          "max_tiled_width",
        ]

        // Select an attribute and random and unset it
        const attr =
          deepZoomAttrs[Math.floor(Math.random() * deepZoomAttrs.length)]
        this.image.unset(attr)
        return this.image.canDeepZoom().should.not.be.ok()
      })

      it("ensures a trailing slash", function () {
        this.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = this.image.deepZoomJson().Image.Url
        return url.charAt(url.length - 1).should.equal("/")
      })

      it("always returns an object", function () {
        this.image.canDeepZoom = () => false
        return this.image.deepZoomJson().should.eql({})
      })

      return it("sets the tile_base_url to the https url", function () {
        this.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = this.image.deepZoomJson().Image.Url
        return url.should.equal(
          `${this.SECURE_IMAGES_URL}/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/`
        )
      })
    })
  })

  return describe("unsecure", function () {
    before(function () {
      return (this.SECURE_IMAGES_URL = null)
    })

    beforeEach(function () {
      return (this.image = new NotReallyAnArtworkImage1(
        fabricate("artwork_image")
      ))
    })

    return describe("#canDeepZoom", () =>
      it("leaves the base part of the tile_base_url alone if SECURE_IMAGES_URL is not present", function () {
        this.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = this.image.deepZoomJson().Image.Url
        return url.should.equal(
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/"
        )
      }))
  })
})
