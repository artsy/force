/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { AToZ } = require("artsy-backbone-mixins")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../models/fair")
const Profile = require("../../../models/profile")
const Item = require("../../../models/item")
const Items = require("../../../collections/items")
const OrderedSet = require("../../../models/ordered_set")
const OrderedSets = require("../../../collections/ordered_sets")
const cheerio = require("cheerio")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Fair", () =>
  describe("footer template", function () {
    before(function () {
      const fair = new Fair(fabricate("fair", { about: "about the fair" }))
      const profile = new Profile(fabricate("fair_profile"))

      // Explore ordered set
      const editorial = new OrderedSet(
        fabricate("set", {
          key: "editorial",
          item_type: "FeaturedLink",
        })
      )
      const editorialItems = new Items(null, "editorial-foo")
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Chinese Art" }))
      )
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Moar Chinese Art" }))
      )

      // Explore ordered set
      const explore = new OrderedSet(
        fabricate("set", {
          key: "explore",
          item_type: "FeaturedLink",
        })
      )
      const exploreItems = new Items(null, "explore-foo")
      exploreItems.add(
        new Item(fabricate("featured_link", { title: "Explore Art" }))
      )
      exploreItems.add(
        new Item(fabricate("featured_link", { title: "Moar Explore Art" }))
      )

      // Primary ordered set
      const primary = new OrderedSet(
        fabricate("set", {
          key: "primary",
          item_type: "FeaturedLink",
        })
      )
      const primaryItems = new Items(null, "primary-foo")
      primaryItems.add(
        new Item(fabricate("featured_link", { title: "Primary Art" }))
      )
      primaryItems.add(
        new Item(fabricate("featured_link", { title: "Moar Primary Art" }))
      )

      // Curator ordered set
      const curator = new OrderedSet(
        fabricate("set", {
          key: "curator",
          item_type: "FeaturedLink",
        })
      )
      const curatorItems = new Items(null, "curator-foo")
      curatorItems.add(
        new Item(fabricate("featured_link", { title: "Curator Art" }))
      )
      curatorItems.add(
        new Item(fabricate("featured_link", { title: "Moar Curator Art" }))
      )
      curatorItems.add(
        new Item(fabricate("featured_link", { title: "EVEN Moar Curator Art" }))
      )

      return (this.template = render("footer")({
        editorialItems: editorialItems.models,
        exploreItems: exploreItems.models,
        primaryItems: primaryItems.models,
        curatorItems: curatorItems.models,
        fair,
        profile,
      }))
    })

    return it("renders valid html", function () {
      const $ = cheerio.load(this.template)
      $(".footer-square-sections .footer-square-section").length.should.equal(5)
      $(".fair-footer-posts-container .small-post").length.should.equal(2)
      return $(".curator-picks-container .small-section").length.should.equal(3)
    })
  }))
