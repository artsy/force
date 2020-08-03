/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const PartnerLocation = require("../../models/partner_location")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerLocation", function () {
  beforeEach(function () {
    return (this.location = new PartnerLocation(fabricate("location")))
  })

  describe("#fullAddress", () =>
    it("concats all the data into one nice line", function () {
      return this.location
        .fullAddress()
        .should.equal("529 W 20th St., New York, NY 10011")
    }))

  describe("#cityState", () =>
    it("returns the location's city and state joined with comma", function () {
      return this.location
        .cityState()
        .should.equal(
          `${this.location.get("city")}, ${this.location.get("state")}`
        )
    }))

  describe("#gmapLink", function () {
    it("returns a link to google maps for the location", function () {
      this.location.gmapLink().should.containEql("https://maps.google.com/maps")
      return this.location
        .gmapLink()
        .should.containEql(encodeURIComponent(this.location.fullAddress()))
    })

    return it("uses the geo coordinates if available", function () {
      const coords = { lng: -73.996035, lat: 40.767494 }
      this.location.set("coordinates", coords)
      this.location.gmapLink().should.containEql("https://maps.google.com/maps")
      return this.location
        .gmapLink()
        .should.containEql(encodeURIComponent(`${coords.lat},${coords.lng}`))
    })
  })

  return describe("#gmapImageUrl", function () {
    it("generates a google maps image url for the location", function () {
      return this.location
        .gmapImageUrl()
        .should.containEql(
          "http://maps.googleapis.com/maps/api/staticmap?center=529%20W%2020th%20" +
            "St.%2C%20New%20York%2C%20NY%2010011&markers=color"
        )
    })

    return it("takes a size param", function () {
      return this.location.gmapImageUrl("300x300").should.containEql("300x300")
    })
  })
})
