/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("graceful-fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../models/fair")
const Fairs = require("../../../collections/fairs")
const FairOrganizer = require("../../../models/fair_organizer")
const Profile = require("../../../models/profile")
const Articles = require("../../../collections/articles")
const CoverImage = require("../../../models/cover_image")
const SearchResult = require("../../../models/search_result")
const Item = require("../../../models/item")
const Items = require("../../../collections/items")
const OrderedSet = require("../../../models/ordered_set")
const OrderedSets = require("../../../collections/ordered_sets")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const cheerio = require("cheerio")
const sinon = require("sinon")
const sdData = require("sharify").data

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Fair Organizer", () =>
  describe("index page", function () {
    before(function (done) {
      const sd = _.extend(sdData, {
        APP_URL: "http://localhost:5000",
        API_URL: "http://localhost:5000",
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        NODE_ENV: "test",
        CURRENT_PATH: "/cool-fair",
        PROFILE: fabricate("fair_organizer_profile"),
        FAIR_ORGANIZER: fabricate("fair_organizer"),
      })
      const fairOrg = new FairOrganizer(sd.FAIR_ORGANIZER)
      const profile = new Profile(sd.PROFILE)

      const pastFairs = new Fairs([fabricate("fair"), fabricate("fair")])

      const editorialItems = new Items([
        fabricate("featured_link", { title: "Japanese Art" }),
      ])
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Chinese Art" }))
      )
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Moar Chinese Art" }))
      )

      pastFairs.each(fair => (fair.representation = editorialItems))

      const template = render("overview")({
        sd,
        fairOrg,
        newestFair: pastFairs.models[0],
        pastFairs: pastFairs.models,
        profile,
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders without errors", function () {
      this.$template.html().should.not.containEql("undefined")
      return this.$template
        .html()
        .should.containEql("Explore Armory Show Fair Organizer")
    })
  }))

describe("Meta tags", () =>
  describe("Profile", function () {
    before(function () {
      this.sd = {
        API_URL: "http://localhost:5000",
        CURRENT_PATH: "/cool-profile/info",
        FAIR_ORGANIZER: fabricate("fair_organizer"),
      }
      this.file = path.resolve(__dirname, "../templates/meta.jade")
      this.profile = new Profile(fabricate("profile"))
      return (this.html = jade.render(fs.readFileSync(this.file).toString(), {
        sd: this.sd,
        profile: this.profile,
      }))
    })

    return it("includes canonical url, twitter card, og tags, and title and respects current_path", function () {
      this.html.should.containEql(
        '<meta property="twitter:card" content="summary'
      )
      this.html.should.containEql(
        `<link rel=\"canonical\" href=\"${this.sd.APP_URL}/cool-profile/info`
      )
      this.html.should.containEql(
        `<meta property=\"og:url\" content=\"${this.sd.APP_URL}/cool-profile/info`
      )
      this.html.should.containEql(
        `<meta property=\"og:title\" content=\"${this.sd.FAIR_ORGANIZER.name} | Artsy`
      )
      return this.html.should.containEql(
        `<meta property=\"og:description\" content=\"Browse artworks, artists and exhibitors from ${this.sd.FAIR_ORGANIZER.name} on Artsy.`
      )
    })
  }))
