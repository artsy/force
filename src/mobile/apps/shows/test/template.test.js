/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const moment = require("moment")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Show = require("../../../models/show")
const { Cities, FeaturedCities } = require("places")

describe("Shows template", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  describe("#index with cities and featured show", function () {
    before(done =>
      benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          sd: {},
          cities: Cities,
          featuredCities: FeaturedCities,
          featuredShow: new Show(fabricate("show")),
        },
        () => done()
      )
    )

    return it("renders correctly", function () {
      $(".shows-header").length.should.equal(1)
      return $(".shows-page-featured-cities a").length.should.equal(11)
    })
  })

  describe("#cities with single city and shows", function () {
    before(function (done) {
      this.currentShow = new Show(
        fabricate("show", {
          status: "running",
          id: "running-show",
          name: "running-show",
        })
      )
      this.upcomingShow = new Show(
        fabricate("show", {
          status: "upcoming",
          id: "upcoming-show",
          name: "upcoming-show",
        })
      )
      this.pastShow = new Show(
        fabricate("show", {
          status: "closed",
          id: "closed-show",
          name: "closed-show",
        })
      )

      return benv.render(
        resolve(__dirname, "../templates/city.jade"),
        {
          sd: {},
          city: { name: "New York" },
          opening: [],
          upcoming: [this.upcomingShow],
          current: [this.currentShow],
          past: [this.pastShow],
        },
        () => done()
      )
    })

    return it("renders correctly", function () {
      $(".shows-city--current-shows").length.should.equal(1)
      $(".shows-city--upcoming-shows").length.should.equal(1)
      return $(".shows-city--past-shows").length.should.equal(1)
    })
  })

  return describe("#all-cities with every city", function () {
    before(done =>
      benv.render(
        resolve(__dirname, "../templates/all_cities.jade"),
        {
          sd: {},
          cities: Cities,
        },
        () => done()
      )
    )

    after(() => benv.teardown())

    return it("renders correctly", () =>
      $(".all-cities-page-all-cities a").length.should.be.above(83))
  })
})
