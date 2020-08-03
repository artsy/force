/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Image = require("../../models/image")
const { fabricate } = require("@artsy/antigravity")

describe("Image", function () {
  beforeEach(function () {
    return (this.image = new Image(fabricate("artwork_image")))
  })

  return describe("#imageUrl", () =>
    it("returns the small image by default", function () {
      this.image.set("image_url", "foo/bar/:version.jpg")
      return this.image.imageUrl().should.equal("foo/bar/small.jpg")
    }))
})
