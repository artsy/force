/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const ViewHelpers = require("../../helpers/view_helpers")
const { fabricate } = require("@artsy/antigravity")

describe("ViewHelpers", () =>
  describe("sailthruTags", function () {
    it("formats sailthru tags properly", function () {
      const artist = fabricate("artist", { id: "artist-id" })
      const partner = fabricate("partner", { id: "partner-id" })
      const location = fabricate("location", {
        city: "New York",
        country: "US",
      })
      const show = fabricate("show", { partner, artists: [artist], location })
      return ViewHelpers.sailthruTags(show).should.eql([
        "artist-id",
        "partner-id",
        "gallery-show",
        "new-york",
        "us",
      ])
    })

    return it("ignores blank fields", function () {
      const artist = fabricate("artist", { id: "artist-id" })
      const partner = fabricate("partner", { id: "partner-id" })
      const location = fabricate("location", { city: null, country: "US" })
      const show = fabricate("show", { partner, artists: [artist], location })
      return ViewHelpers.sailthruTags(show).should.eql([
        "artist-id",
        "partner-id",
        "gallery-show",
        "us",
      ])
    })
  }))
