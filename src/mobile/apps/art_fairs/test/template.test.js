const benv = require("benv")
const moment = require("moment")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Helpers = require("../helpers.coffee")
import { times, uniqueId } from "lodash"

describe("Art fairs template", () => {
  let currentFairs
  let pastFairs
  let upcomingFairs

  before(() => {
    const profile = {
      is_published: true,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const unpublished_profile = {
      is_published: false,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const location = { city: "New York", state: "NY", country: "US" }
    currentFairs = times(2, () =>
      fabricate("fair", {
        location,
        image: {
          url: {
            "https://www.example.com/cat.jpg":
              "https://www.example.com/cat.jpg",
          },
        },
        profile,
        id: uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().add(10, "days"),
      })
    )
    pastFairs = times(4, () =>
      fabricate("fair", {
        location,
        profile,
        id: uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().subtract(10, "days"),
      })
    )
    upcomingFairs = times(3, () =>
      fabricate("fair", {
        profile: unpublished_profile,
        id: uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: null,
        end_at: moment().add(10, "days"),
      })
    )
  })

  describe("with currentFairs", () => {
    before(done => {
      benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          asset() {},
          _: require("underscore"),
          navItems: [
            { name: "Current", hasItems: currentFairs.length },
            { name: "Upcoming", hasItems: upcomingFairs.length },
            { name: "Past", hasItems: pastFairs.length },
          ],
          emptyMessage: "Past Events",
          extraClasses: "art-fairs-tabs",
          featuredFairs: currentFairs,
          currentFairs: currentFairs,
          pastFairs: pastFairs,
          upcomingFairs: upcomingFairs,
          Helpers,
          remainingPastFairs: [],
        })
        done()
      })
    })

    after(() => benv.teardown())

    it("renders header with current fairs active", () => {
      $(".art-fairs-header").html().should.containEql("Collect from leading")
      $(".art-fairs-tab[data-tab=current]").hasClass("art-fairs-tab--active")
    })
  })

  describe("without currentFairs", () => {
    before(done => {
      benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          _: require("underscore"),
          navItems: [
            { name: "Current", hasItems: currentFairs.length },
            { name: "Upcoming", hasItems: upcomingFairs.length },
            { name: "Past", hasItems: pastFairs.length },
          ],
          emptyMessage: "Past Events",
          extraClasses: "art-fairs-tabs",
          asset() {},
          currentFairs: [],
          pastFairs: pastFairs,
          upcomingFairs: upcomingFairs,
          Helpers,
          remainingPastFairs: [],
        })
        done()
      })
    })

    after(() => benv.teardown())

    it("renders header with upcoming fairs active", () => {
      $(".art-fairs-header").html().should.containEql("Collect from leading")
      $(".art-fairs-header").hasClass("art-fairs-header--background-image")
      $(".art-fairs-tab[data-tab=upcoming]").hasClass("art-fairs-tab--active")
    })
  })
})
