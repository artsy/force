/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const Partner = require("../../models/partner")

describe("Partner", function () {
  beforeEach(function () {
    this.partner = new Partner(
      fabricate("partner", {
        type: "Gallery",
        sortable_id: "gagosian-gallery",
        default_profile_id: "gagosian",
      })
    )
    return this.partner.related().locations.add(fabricate("location"))
  })

  describe("#displayType", function () {
    it("returns the correct type string (1)", function () {
      return this.partner.displayType().should.equal("Gallery")
    })

    return it("returns the correct type string (2)", function () {
      this.partner.set("type", "Auction")
      return this.partner.displayType().should.equal("Auction House")
    })
  })

  describe("#alphaSortKey", () =>
    it("returns the partner model's sortable_id", function () {
      return this.partner
        .alphaSortKey()
        .should.equal(this.partner.get("sortable_id"))
    }))

  describe("#href", () =>
    it("returns the client link to this partner profile slug", function () {
      return this.partner
        .href()
        .should.equal(`/${this.partner.get("default_profile_id")}`)
    }))

  describe("#displayName", () =>
    it("returns the partner's name", function () {
      return this.partner.displayName().should.equal(this.partner.get("name"))
    }))

  describe("partner locations", () =>
    it("has related PartnerLocations collection", function () {
      return this.partner.related().locations.length.should.equal(1)
    }))

  return describe("#displayLocations", function () {
    it("acts as a proxy to partner.related().locations", function () {
      return this.partner
        .displayLocations()
        .should.equal(this.partner.related().locations.displayLocations())
    })

    return it("returns a string representing the partner's locations", function () {
      return this.partner.displayLocations().should.equal("New York")
    })
  })
})
