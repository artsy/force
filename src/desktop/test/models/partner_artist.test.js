/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const should = require("should")
const Backbone = require("backbone")
const PartnerArtist = require("../../models/partner_artist")

describe("PartnerArtist", function () {
  beforeEach(function () {
    const partner = fabricate("partner", {
      id: "baang-plus-burne",
      default_profile_id: "baang-and-burne",
    })
    return (this.partnerArtist = new PartnerArtist(
      fabricate("partner_artist", { partner })
    ))
  })

  return describe("#href", () =>
    it("uses partners default profile id instead of id", function () {
      return this.partnerArtist
        .href()
        .should.equal(
          `/${this.partnerArtist.get("partner").default_profile_id}/artist/${
            this.partnerArtist.get("artist").id
          }`
        )
    }))
})
