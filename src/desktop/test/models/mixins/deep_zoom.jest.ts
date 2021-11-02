import _ from "underscore"
import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const { DeepZoom } = require("../../../models/mixins/deep_zoom")
const { Image } = require("@artsy/backbone-mixins")

const SECURE_IMAGES_URL = "https://supersecure.foo.bar"
class NotReallyAnArtworkImage extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, DeepZoom(SECURE_IMAGES_URL))
  }
}
NotReallyAnArtworkImage.initClass()

class NotReallyAnArtworkImage2 extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Image(null))
    _.extend(this.prototype, DeepZoom(null))
  }
}
NotReallyAnArtworkImage2.initClass()

describe("Deep Zoom mixin", () => {
  let testContext

  beforeAll(() => {
    testContext = {}
  })

  describe("secure", () => {
    beforeAll(() => {
      testContext.SECURE_IMAGES_URL = SECURE_IMAGES_URL
    })

    beforeEach(() => {
      testContext.image = new NotReallyAnArtworkImage(
        // @ts-ignore
        fabricate("artwork_image")
      )
    })

    describe("#canDeepZoom", () => {
      it("should be deep-zoomable if *all* the deep zoom attributes are present", () => {
        testContext.image.canDeepZoom().should.be.ok()
        const deepZoomAttrs = [
          "tile_base_url",
          "tile_size",
          "tile_overlap",
          "tile_format",
          "max_tiled_height",
          "max_tiled_width",
        ]

        // Un-set each attribute and verify image is no longer zoomable
        _.each(deepZoomAttrs, attr => {
          testContext.image.unset(attr)
          testContext.image.canDeepZoom().should.not.be.ok()
          testContext.image.set(attr, "blah")
        })
      })

      it("ensures a trailing slash", () => {
        testContext.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = testContext.image.deepZoomJson().Image.Url
        url.charAt(url.length - 1).should.equal("/")
      })

      it("always returns an object", () => {
        testContext.image.canDeepZoom = () => false
        testContext.image.deepZoomJson().should.eql({})
      })

      it("sets the tile_base_url to the https url", () => {
        testContext.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = testContext.image.deepZoomJson().Image.Url
        url.should.equal(
          `${testContext.SECURE_IMAGES_URL}/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/`
        )
      })
    })
  })

  describe("unsecure", () => {
    beforeAll(() => {
      testContext.SECURE_IMAGES_URL = null
    })

    beforeEach(() => {
      testContext.image = new NotReallyAnArtworkImage2(
        // @ts-ignore
        fabricate("artwork_image")
      )
    })

    describe("#canDeepZoom", () => {
      it("leaves the base part of the tile_base_url alone if SECURE_IMAGES_URL is not present", () => {
        testContext.image.set(
          "tile_base_url",
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0"
        )
        const url = testContext.image.deepZoomJson().Image.Url
        url.should.equal(
          "http://static0.artsy.net/additional_images/4e7cb83e1c80dd00010038e2/1/dztiles-512-0/"
        )
      })
    })
  })
})
