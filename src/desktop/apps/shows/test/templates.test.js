/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { Cities, FeaturedCities } = require("places")
const Show = require("../../../models/partner_show")
const Shows = require("../shows")

describe("Location Based", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  return describe("with opening shows", function () {
    before(function () {
      return (this.defaults = {
        sd: {},
        asset() {},
        city: Cities[0], // Amsterdam
        cities: Cities.slice(0, 2),
        featuredCities: FeaturedCities.slice(0, 2),
      })
    })

    describe("on the first page", function () {
      before(function (done) {
        return benv.render(
          resolve(__dirname, "../templates/location_based.jade"),
          _.defaults(
            {
              opening: [new Show(fabricate("show"))],
              upcoming: [],
              current: new Shows([fabricate("show")], {
                state: { currentPage: 1, pageSize: 1, totalRecords: 1 },
              }),
              past: [],
            },
            this.defaults
          ),
          done
        )
      })

      return it("displays opening shows", () =>
        $(".shows-page-header")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql(["Opening This Week", "Current Shows in Amsterdam (1)"]))
    })

    return describe("on the second page", function () {
      before(function (done) {
        return benv.render(
          resolve(__dirname, "../templates/location_based.jade"),
          _.defaults(
            {
              opening: [new Show(fabricate("show"))],
              upcoming: [],
              current: new Shows(
                _.times(2, () => fabricate("show")),
                { state: { currentPage: 2, pageSize: 1, totalRecords: 2 } }
              ),
              past: [],
            },
            this.defaults
          ),
          done
        )
      })

      return it("displays opening shows", () =>
        $(".shows-page-header")
          .map(function () {
            return $(this).text()
          })
          .get()
          .should.eql(["Current Shows in Amsterdam (2)"]))
    })
  })
})
