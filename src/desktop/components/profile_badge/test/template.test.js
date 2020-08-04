/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const cheerio = require("cheerio")
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../models/profile")

const render = function (template) {
  const filename = path.resolve(__dirname, `../${template}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Profile Badge template", function () {
  beforeEach(function () {
    return (this.profile = new Profile(fabricate("profile")))
  })

  it("renders the profile display name", function () {
    const $ = cheerio.load(render("template")({ profile: this.profile }))
    return $(".profile-badge-name")
      .text()
      .should.equal(this.profile.displayName())
  })

  describe("with an icon", () =>
    it("renders the profile icon", function () {
      const $ = cheerio.load(render("template")({ profile: this.profile }))
      $(".profile-badge-icon").should.have.lengthOf(1)
      return $(".profile-badge-icon")
        .attr("style")
        .should.containEql(this.profile.iconImageUrl())
    }))

  return describe("with no icon", function () {
    it("displays initials for partner profiles", function () {
      this.profile = new Profile(fabricate("partner_profile"))
      delete this.profile.attributes.icon
      const $ = cheerio.load(render("template")({ profile: this.profile }))
      $(".profile-badge-icon").should.have.lengthOf(0)
      return $(".profile-badge-initials")
        .text()
        .should.equal(this.profile.defaultIconInitials())
    })

    return it("displays a default profile icon for users", function () {
      delete this.profile.attributes.icon
      this.profile.set({ owner_type: "User" })
      const $ = cheerio.load(render("template")({ profile: this.profile }))
      return $(".profile-badge-icon")
        .css("background-image")
        .should.containEql(this.profile.iconImageUrl())
    })
  })
})
