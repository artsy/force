/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let filename
const $ = require("cheerio")
const fs = require("fs")
const jade = require("jade")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../../../models/profile")
const template = jade.compile(
  fs.readFileSync((filename = require.resolve("../template.jade"))),
  { filename }
)

describe("PrimaryCarousel template", function () {
  describe("with at least one profile to show", function () {
    before(function () {
      this.profile = new Profile(
        fabricate("profile", { owner_type: "PartnerGallery" })
      )
      const partner = this.profile.related().owner
      partner.set(fabricate("partner"))
      return partner.related().shows.add(fabricate("show"))
    })

    it("displays the carousel", function () {
      this.html = template({ profiles: [this.profile] })
      this.$ = $.load(this.html)
      return this.$(".gpc-body").should.not.be.empty()
    })

    it("renders correctly", function () {
      this.html = template({ profiles: [this.profile] })
      this.$ = $.load(this.html)

      this.$(".gpc-subheadline").text().should.equal("Past New York Show")

      return this.$(".gpc-location-dates")
        .text()
        .should.equal("New York, Jul 12 – Aug 23, 2013")
    })

    return describe("with more than one profile to show", () =>
      it("shows navigation arrows", function () {
        this.html = template({ profiles: [this.profile, this.profile] })
        this.$ = $.load(this.html)
        return this.$ * ".gpc-bumpers".should.not.be.empty()
      }))
  })

  return describe("with no profiles to show", () =>
    it("does not display the carousel", function () {
      this.html = template({ profiles: [] })
      return this.html.should.be.empty()
    }))
})
