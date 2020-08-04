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

  describe("#imageUrl", function () {
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

  describe("#srcUrl", () =>
    it("returns a url to the video for an extension and resolution", function () {
      return this.video
        .srcUrl(".mp4")
        .should.equal(`${this.video.get("hr_video_url")}${".mp4"}`)
    }))

  return describe("#layoutStyle", () =>
    it("returns a layout style string for the number of videos in the layout", function () {
      this.video.layoutStyle(1).should.equal("full")
      this.video.layoutStyle(2).should.equal("half")
      this.video.layoutStyle(3).should.equal("third")
      return this.video.layoutStyle(4).should.equal("quarter")
    }))
})
