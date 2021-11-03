import { fabricate } from "@artsy/antigravity"
const { PartnerArtist } = require("../../models/partner_artist")

describe("PartnerArtist", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    const partner = fabricate("partner", {
      default_profile_id: "baang-and-burne",
      id: "baang-plus-burne",
    })
    testContext.partnerArtist = new PartnerArtist(
      fabricate("partner_artist", { partner })
    )
  })

  describe("#href", () => {
    it("uses partners id instead of default profile id", () => {
      testContext.partnerArtist
        .href()
        .should.equal(
          `/partner/${testContext.partnerArtist.get("partner").id}/artists/${
            testContext.partnerArtist.get("artist").id
          }`
        )
    })
  })
})
