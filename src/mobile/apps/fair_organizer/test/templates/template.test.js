/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../../models/fair")
const Fairs = require("../../../../collections/fairs")
const FairOrganizer = require("../../../../models/fair_organizer")
const Profile = require("../../../../models/profile")
const Articles = require("../../../../collections/articles")
const CoverImage = require("../../../../models/cover_image")
const SearchResult = require("../../../../models/search_result")
const Item = require("../../../../models/item")
const Items = require("../../../../collections/items")
const OrderedSet = require("../../../../models/ordered_set")
const OrderedSets = require("../../../../collections/ordered_sets")
const cheerio = require("cheerio")
const sinon = require("sinon")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Fair Organizer", () =>
  describe("index page", function () {
    before(function (done) {
      const sd = {
        APP_URL: "http://localhost:5000",
        API_URL: "http://localhost:5000",
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        NODE_ENV: "test",
        CURRENT_PATH: "/cool-fair",
        PROFILE: fabricate("fair_organizer_profile"),
        FAIR_ORG: fabricate("fair_organizer"),
      }
      const fairOrg = new FairOrganizer(sd.FAIR_ORG)
      const profile = new Profile(sd.PROFILE)

      const pastFairs = new Fairs([
        fabricate("fair"),
        fabricate("fair", { id: "meow" }),
      ])

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

      const template = render("index")({
        sd,
        fairOrg,
        newestFair: pastFairs.models[0],
        pastFairs: pastFairs.models,
        profile,
        asset() {},
        articles: [],
        _,
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders without errors", function () {
      this.$template.html().should.containEql("Armory Show Fair Organizer")
      return this.$template(
        "#fair-organization__previous_years .past-fairs--fair-image-grid"
      ).length.should.equal(2)
    })
  }))
