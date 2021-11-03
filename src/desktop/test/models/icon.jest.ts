import sinon from "sinon"
import Backbone from "backbone"
const Icon = require("../../models/icon")
const { Profile } = require("../../models/profile")
import { fabricate } from "@artsy/antigravity"

describe("Icon", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.profile = new Profile(fabricate("profile"))
    testContext.icon = testContext.profile.icon()
  })

  afterEach(() => {
    Backbone.sync.restore()
  })

  describe("#url", () => {
    it("returns a url with a profile id in it", () => {
      testContext.icon
        .url()
        .should.containEql(
          `api/v1/profile/${testContext.profile.get("id")}/icon`
        )
    })
  })

  describe("#validate", () => {
    it("is valid without a file object to validate against", () => {
      testContext.icon.isValid().should.be.true()
    })

    it("invalidates the icon if the size is greater than 3MB", () => {
      testContext.icon.set("file", {
        size: testContext.icon.maxFileSize,
        type: ".png",
      })
      testContext.icon.isValid().should.be.true()

      testContext.icon.set("file", {
        size: testContext.icon.maxFileSize - 1,
        type: ".png",
      })
      testContext.icon.isValid().should.be.true()

      testContext.icon.set("file", {
        size: testContext.icon.maxFileSize + 1,
        type: ".png",
      })
      testContext.icon.isValid().should.be.false()
    })

    it("invalidates the icon if the file is not an image", () => {
      testContext.icon.set("file", {
        size: testContext.icon.maxFileSize,
        type: ".pdf",
      })
      testContext.icon.isValid().should.be.false()

      testContext.icon.set("file", {
        size: testContext.icon.maxFileSize,
        type: ".png",
      })
      testContext.icon.isValid().should.be.true()
    })
  })

  describe("#imageUrl", () => {
    it("does the usual version swap if the image is processed and happy", () => {
      testContext.icon
        .imageUrl()
        .should.equal(
          testContext.icon
            .get("image_url")
            .replace(":version", "square")
            .replace("jpg", "png")
        )
    })

    it("returns the original if the image has not had versions processed", () => {
      testContext.icon.set("versions", null)
      testContext.icon
        .imageUrl()
        .should.equal(
          testContext.icon.get("image_url").replace(":version", "original")
        )
    })

    it("returns the default as a fall through", () => {
      testContext.icon.set({
        image_filename: null,
        versions: null,
      })
      testContext.icon.imageUrl().should.equal(Icon.DefaultUserIconUrl)
    })
  })
})
