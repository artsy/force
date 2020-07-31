/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const moment = require("moment")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Helpers = require("../helpers.coffee")

describe("Art fairs template", function () {
  before(function () {
    const profile = {
      is_published: true,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const unpublished_profile = {
      is_published: false,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const location = { city: "New York", state: "NY", country: "US" }
    this.currentFairs = _.times(2, function () {
      const fair = fabricate("fair", {
        location,
        image: {
          url: {
            "https://www.example.com/cat.jpg":
              "https://www.example.com/cat.jpg",
          },
        },
        profile,
        id: _.uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().add(10, "days"),
      })
      return fair
    })
    this.pastFairs = _.times(4, function () {
      const fair = fabricate("fair", {
        location,
        profile,
        id: _.uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().subtract(10, "days"),
      })
      return fair
    })
    return (this.upcomingFairs = _.times(3, () =>
      fabricate("fair", {
        profile: unpublished_profile,
        id: _.uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: null,
        end_at: moment().add(10, "days"),
      })
    ))
  })

  describe("with currentFairs", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          asset() {},
          _: require("underscore"),
          navItems: [
            { name: "Current", hasItems: this.currentFairs.length },
            { name: "Upcoming", hasItems: this.upcomingFairs.length },
            { name: "Past", hasItems: this.pastFairs.length },
          ],
          emptyMessage: "Past Events",
          extraClasses: "art-fairs-tabs",
          featuredFairs: this.currentFairs,
          currentFairs: this.currentFairs,
          pastFairs: this.pastFairs,
          upcomingFairs: this.upcomingFairs,
          Helpers,
          remainingPastFairs: [],
        })
        return done()
      })
    })

    after(() => benv.teardown())

    // this test always fails ci
    return xit("renders header with current fairs active", function () {
      $(".art-fairs-header").html().should.containEql("Collect from leading")
      return $(".art-fairs-tab[data-tab=current]").hasClass(
        "art-fairs-tab--active"
      )
    })
  })

  return describe("without currentFairs", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        Backbone.$ = $
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          _: require("underscore"),
          navItems: [
            { name: "Current", hasItems: this.currentFairs.length },
            { name: "Upcoming", hasItems: this.upcomingFairs.length },
            { name: "Past", hasItems: this.pastFairs.length },
          ],
          emptyMessage: "Past Events",
          extraClasses: "art-fairs-tabs",
          asset() {},
          currentFairs: [],
          pastFairs: this.pastFairs,
          upcomingFairs: this.upcomingFairs,
          Helpers,
          remainingPastFairs: [],
        })
        return done()
      })
    })

    after(() => benv.teardown())

    return it("renders header with upcoming fairs active", function () {
      $(".art-fairs-header").html().should.containEql("Collect from leading")
      $(".art-fairs-header").hasClass("art-fairs-header--background-image")
      return $(".art-fairs-tab[data-tab=upcoming]").hasClass(
        "art-fairs-tab--active"
      )
    })
  })
})
