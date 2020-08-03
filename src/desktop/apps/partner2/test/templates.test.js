/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../models/profile")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Partner header", () =>
  describe("canonical links", function () {
    beforeEach(function () {
      return (this.profile = new Profile(fabricate("profile")))
    })

    it("has a canonical link to the full artist page on partner artist pages", function () {
      this.template = render("index")({
        profile: this.profile,
        sd: { APP_URL: "http://localhost:3004", CURRENT_PATH: "/pace-gallery" },
        asset() {},
        params: { id: "pace-gallery", artistId: "yoshitomo-nara" },
      })
      return this.template.should.containEql(
        '<link rel="canonical" href="http://localhost:3004/artist/yoshitomo-nara">'
      )
    })

    it("has a canonical link to current url on other pages", function () {
      this.template = render("index")({
        profile: this.profile,
        sd: { APP_URL: "http://localhost:3004", CURRENT_PATH: "/pace-gallery" },
        asset() {},
        params: { id: "pace-gallery" },
      })
      return this.template.should.containEql(
        '<link rel="canonical" href="http://localhost:3004/pace-gallery">'
      )
    })

    it("has meta fragment", function () {
      this.template = render("index")({
        profile: this.profile,
        sd: {
          APP_URL: "http://localhost:3004",
          CURRENT_PATH: "/pace-gallery",
          INCLUDE_ESCAPED_FRAGMENT: true,
        },
        asset() {},
        params: { id: "pace-gallery" },
      })
      return this.template.should.containEql(
        '<meta name="fragment" content="!">'
      )
    })

    it("does not have meta fragment if tab is included", function () {
      this.template = render("index")({
        profile: this.profile,
        tab: "overview",
        sd: {
          APP_URL: "http://localhost:3004",
          CURRENT_PATH: "/pace-gallery",
          INCLUDE_ESCAPED_FRAGMENT: true,
        },
        asset() {},
        params: { id: "pace-gallery" },
      })
      return this.template.should.not.containEql(
        '<meta name="fragment" content="!">'
      )
    })

    return describe("followers", function () {
      describe("galleries", () =>
        it("does not display follower count", function () {
          this.profile.set({ owner_type: "PartnerGallery", follows_count: 999 })
          this.template = render("index")({
            profile: this.profile,
            tab: "overview",
            sd: {
              APP_URL: "http://localhost:3004",
              CURRENT_PATH: "/pace-gallery",
            },
            asset() {},
            params: { id: "pace-gallery" },
          })
          return this.template.should.not.containEql("partner-followers")
        }))

      return describe("institutions", function () {
        beforeEach(function () {
          return (this.profile = new Profile(
            fabricate("profile", { owner_type: "PartnerInstitution" })
          ))
        })

        return it("does not display follower count", function () {
          this.profile.set({ follows_count: 2222 })
          this.template = render("index")({
            profile: this.profile,
            tab: "overview",
            sd: {
              APP_URL: "http://localhost:3004",
              CURRENT_PATH: "/philadelphia-museum-of-art",
            },
            asset() {},
            params: { id: "philadelphia-museum-of-art" },
          })
          return this.template.should.not.containEql("partner-followers")
        })
      })
    })
  }))
