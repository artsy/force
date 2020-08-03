/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Video = require("../../models/video")
const { fabricate } = require("@artsy/antigravity")

describe("Video", function () {
  beforeEach(function () {
    return (this.video = new Video(fabricate("video")))
  })

  describe("#hasImage", function () {
    it("returns true if the version exists", function () {
      return this.video.hasImage("large_cinematic").should.be.ok()
    })

    it("returns false if the version does not exist", function () {
      return this.video.hasImage("something-dummy").should.not.be.ok()
    })

    return it("returns false if image versions do not exist", function () {
      this.video.unset("image_versions")
      return this.video.hasImage("large_cinematic").should.not.be.ok()
    })
  })

  return describe("#imageUrl", function () {
    it("returns the image url if it exists", function () {
      return this.video
        .imageUrl()
        .should.match(new RegExp(`/local/videos/.*/large_rectangle.jpg`))
    })

    return it("works if there are no images", function () {
      this.video.set({ image_url: "" })
      return this.video.imageUrl().should.equal("")
    })
  })
})
