/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const moment = require("moment")
const ViewHelpers = require("../helpers/view_helpers.coffee")

describe("Fairs template", function () {
  before(function () {
    const image = { url: "https://www.example.com/cat.jpg" }
    const profile = { icon: { url: "https://www.example.com/cat.jpg" } }
    this.currentFairs = _.times(2, () =>
      fabricate("fair", {
        profile,
        image,
        id: _.uniqueId(),
        published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().add(10, "days"),
        banner_size: "large",
      })
    )
    this.pastFairs = _.times(4, () =>
      fabricate("fair", {
        profile,
        image,
        id: _.uniqueId(),
        published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().subtract(10, "days"),
      })
    )
    this.upcomingFairs = _.times(3, () =>
      fabricate("fair", {
        profile,
        image,
        id: _.uniqueId(),
        published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: null,
        end_at: moment().add(10, "days"),
      })
    )

    return (this.rows = ViewHelpers.fillRows(this.currentFairs))
  })

  describe("with current fairs", function () {
    beforeEach(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          asset() {},
          featuredFairs: this.currentFairs,
          currentFairs: this.currentFairs,
          pastFairs: this.pastFairs,
          upcomingFairs: this.upcomingFairs,
          currentFairRows: this.rows,
          ViewHelpers,
        })
        return done()
      })
    })

    afterEach(() => benv.teardown())

    // TODO: Intermittent failure, we should probably refactor this suite to use
    // cheerio and jade.render to avoid DOM finickyness
    xit("renders correctly", function () {
      $(".fairs__current-fairs h1.fair-header")
        .text()
        .should.equal("Current Events")
      return $(".fairs__current-fair").length.should.equal(2)
    })

    return xit("groups the splits the current fairs into one row", function () {
      $(".fairs__current-fair-row--half").length.should.equal(1)
      return $(
        ".fairs__current-fair-row--half .fairs__current-fair"
      ).length.should.equal(2)
    })
  })

  return describe("without current fairs", function () {
    before(function (done) {
      return benv.setup(() => {
        benv.expose({
          $: benv.require("jquery"),
          jQuery: benv.require("jquery"),
        })
        benv.render(resolve(__dirname, "../templates/index.jade"), {
          sd: {},
          asset() {},
          featuredFairs: this.pastFairs,
          currentFairs: [],
          pastFairs: this.pastFairs,
          upcomingFairs: this.upcomingFairs,
          currentFairRows: [],
          ViewHelpers,
        })
        return done()
      })
    })

    after(() => benv.teardown())

    return xit("renders correctly, with a fair promo", function () {
      $(".fairs__promo").length.should.equal(1)
      $(".fairs__past-fairs h1.fair-header").text().should.equal("Past Events")
      return $(".fairs__past-fair").length.should.equal(4)
    })
  })
})
