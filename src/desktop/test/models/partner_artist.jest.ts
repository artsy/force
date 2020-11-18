import _ from "underscore"
import { fabricate } from "@artsy/antigravity"
const PartnerArtist = require("../../models/partner_artist.coffee")

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
    it("uses partners default profile id instead of id", () => {
      testContext.partnerArtist
        .href()
        .should.equal(
          `/${
            testContext.partnerArtist.get("partner").default_profile_id
          }/artist/${testContext.partnerArtist.get("artist").id}`
        )
    })
  })
})
