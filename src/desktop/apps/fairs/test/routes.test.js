/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const moment = require("moment")
const rewire = require("rewire")
const Q = require("bluebird-q")
const { fabricate } = require("@artsy/antigravity")
const routes = rewire("../routes")
const ViewHelpers = require("../helpers/view_helpers.coffee")

describe("Fairs routes", function () {
  beforeEach(function () {
    const image = { url: "https://www.example.com/cat.jpg" }
    const profile = {
      is_published: true,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    this.currentFairs = _.times(2, () =>
      fabricate("fair", {
        image,
        profile,
        id: _.uniqueId(),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        start_at: moment().subtract(1, "days"),
        end_at: moment().add(11, "days").format(),
        banner_size: "x-large",
      })
    )
    this.pastFairs = _.times(4, () =>
      fabricate("fair", {
        image,
        profile,
        id: _.uniqueId("past"),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().subtract(11, "days").format(),
      })
    )
    this.upcomingFairs = _.times(3, () =>
      fabricate("fair", {
        id: _.uniqueId("upcoming"),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: null,
        end_at: moment().add(11, "days"),
        start_at: moment().add(1, "days"),
      })
    )

    this.rows = ViewHelpers.fillRows(this.currentFairs)

    // Eligible fairs have published profiles
    // also need to unset in_row from filling the rows
    return _.map(
      _.flatten([this.currentFairs, this.pastFairs]),
      fair => delete fair.in_row
    )
  })

  return describe("#index", function () {
    describe("with active current fairs", function () {
      beforeEach(function () {
        this.res = { render: sinon.stub(), locals: { sd: sinon.stub() } }
        this.fairs = _.flatten([
          this.currentFairs,
          this.pastFairs,
          this.upcomingFairs,
        ])
        return routes.__set__("metaphysics", () =>
          Q.resolve({ featured_fairs: [{ fairs: {} }], fairs: this.fairs })
        )
      })

      return it("fetches the fairs and renders the index template", function () {
        return routes.index({}, this.res).then(() => {
          this.res.render.args[0][1].currentFairRows.should.eql(this.rows)
          this.res.render.args[0][1].upcomingFairs.should.eql(
            this.upcomingFairs
          )
          return this.res.render.args[0][1].pastFairs.should.eql(this.pastFairs)
        })
      })
    })

    return describe("with no current fairs", function () {
      beforeEach(function () {
        this.res = { render: sinon.stub(), locals: { sd: sinon.stub() } }
        this.fairs = _.flatten([this.pastFairs, this.upcomingFairs])
        return routes.__set__("metaphysics", () =>
          Q.resolve({ featured_fairs: [{ fairs: {} }], fairs: this.fairs })
        )
      })

      return it("fetches the fairs and renders the index template", function () {
        return routes.index({}, this.res).then(() => {
          this.res.render.args[0][1].currentFairRows.should.eql([])
          this.res.render.args[0][1].upcomingFairs.should.eql(
            this.upcomingFairs
          )
          return this.res.render.args[0][1].pastFairs.should.eql(this.pastFairs)
        })
      })
    })
  })
})
