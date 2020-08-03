/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const _s = require("underscore.string")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../../models/fair")
const Profile = require("../../../../models/profile")
const cheerio = require("cheerio")

const fair = new Fair(fabricate("fair"))
const profile = new Profile(fabricate("fair_profile"))

const render = function (templateName, locals) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  const sd = {
    APP_URL: "http://localhost:5000",
    API_URL: "http://localhost:5000",
    NODE_ENV: "test",
  }
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Metatags", () =>
  describe("overview page", function () {
    before(function (done) {
      const sd = {
        CURRENT_PATH: "/cool-fair",
        SECTION: "overview",
        FAIR: fabricate("fair"),
      }
      const fair = new Fair(sd.FAIR)
      const profile = new Profile(sd.PROFILE)
      const template = render("head")({
        sd,
        fair,
        profile,
        _s,
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders the default title and description in the root directory", function () {
      this.$template
        .html()
        .should.containEql("<title>Armory Show 2013 | Artsy</title>")
      return this.$template
        .html()
        .should.containEql(
          '<meta name="description" content="Browse artworks, artists and exhibitors from Armory Show 2013 on Artsy.">'
        )
    })
  }))
