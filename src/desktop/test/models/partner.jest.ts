import { fabricate } from "@artsy/antigravity"
const { Partner } = require("../../models/partner")

describe("Partner", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.partner = new Partner(
      fabricate("partner", {
        default_profile_id: "gagosian",
        sortable_id: "gagosian-gallery",
        type: "Gallery",
      })
    )
    testContext.partner.related().locations.add(fabricate("location"))
  })

  describe("#displayType", () => {
    it("returns the correct type string (1)", () => {
      testContext.partner.displayType().should.equal("Gallery")
    })

    it("returns the correct type string (2)", () => {
      testContext.partner.set("type", "Auction")
      testContext.partner.displayType().should.equal("Auction House")
    })
  })

  describe("#alphaSortKey", () => {
    it("returns the partner model's sortable_id", () => {
      testContext.partner
        .alphaSortKey()
        .should.equal(testContext.partner.get("sortable_id"))
    })
  })

  describe("#href", () => {
    it("returns the client link to this partner profile slug", () => {
      testContext.partner
        .href()
        .should.equal(`/partner/${testContext.partner.get("id")}`)
    })
  })

  describe("#displayName", () => {
    it("returns the partner's name", () => {
      testContext.partner
        .displayName()
        .should.equal(testContext.partner.get("name"))
    })
  })

  describe("partner locations", () => {
    it("has related PartnerLocations collection", () => {
      testContext.partner.related().locations.length.should.equal(1)
    })
  })

  describe("#displayLocations", () => {
    it("acts as a proxy to partner.related().locations", () => {
      testContext.partner
        .displayLocations()
        .should.equal(
          testContext.partner.related().locations.displayLocations()
        )
    })

    it("returns a string representing the partner's locations", () => {
      testContext.partner.displayLocations().should.equal("New York")
    })
  })
})
