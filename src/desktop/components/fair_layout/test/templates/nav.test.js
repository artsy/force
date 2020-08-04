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
const CurrentUser = require("../../../../models/current_user")
const cheerio = require("cheerio")

const fair = new Fair(fabricate("fair"))
const profile = new Profile(fabricate("fair_profile"))

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Header template", function () {
  describe("Microsite template", function () {
    before(function (done) {
      const sd = {
        APP_URL: "http://localhost:5000",
        API_URL: "http://localhost:5000",
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        NODE_ENV: "test",
        CURRENT_PATH: "/cool-fair",
        PROFILE: fabricate("fair_profile"),
        FAIR: fabricate("fair", { filter_genes: [] }),
        FACEBOOK_APP_NAMESPACE: "namespace",
      }
      const fair = new Fair(sd.FAIR)
      const profile = new Profile(sd.PROFILE)
      const user = new CurrentUser(fabricate("user"))
      const template = render("header")({
        sd,
        fair,
        profile,
        user,
        _s,
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders the user header", function () {
      const user = new CurrentUser(fabricate("user"))
      return this.$template.html().should.containEql("/user/saves")
    })
  })

  return describe("logged out", function () {
    before(function (done) {
      const sd = {
        APP_URL: "http://localhost:5000",
        API_URL: "http://localhost:5000",
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        NODE_ENV: "test",
        CURRENT_PATH: "/cool-fair",
        PROFILE: fabricate("fair_profile"),
        FAIR: fabricate("fair", { filter_genes: [] }),
        FACEBOOK_APP_NAMESPACE: "namespace",
      }
      const fair = new Fair(sd.FAIR)
      const profile = new Profile(sd.PROFILE)
      const user = undefined
      const template = render("header")({
        sd,
        fair,
        profile,
        user,
        _s,
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("works with out user", function () {
      const user = undefined

      return this.$template.html().should.containEql("/log_in")
    })
  })
})
