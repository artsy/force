/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const PartnerLocations = require("../../collections/partner_locations")

describe("PartnerLocations", function () {
  beforeEach(function () {
    return (this.shows = new PartnerLocations(null, { partnerId: "foobar" }))
  })

  return describe("#url", () =>
    it("includes the partner id", function () {
      return this.shows
        .url()
        .should.containEql("/api/v1/partner/foobar/locations")
    }))
})
