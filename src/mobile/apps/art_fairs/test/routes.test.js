/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const Backbone = require("backbone")
const moment = require("moment")
const rewire = require("rewire")
const routes = rewire("../routes")
const Q = require("bluebird-q")

class OrderedSetsFixture extends Backbone.Collection {
  fetchAll() {
    return {
      then(cb) {
        return cb()
      },
    }
  }
}
routes.__set__("OrderedSets", OrderedSetsFixture)

describe("#index", function () {
  beforeEach(function () {
    const profile = {
      is_published: true,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const unpublished_profile = {
      is_published: false,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    this.currentFairs = _.times(2, () =>
      fabricate("fair", {
        profile,
        id: _.uniqueId("current"),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().add(10, "days"),
      })
    )
    this.pastFairs = _.times(4, () =>
      fabricate("fair", {
        profile,
        id: _.uniqueId("past"),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: fabricate("fair_organizer"),
        end_at: moment().subtract(10, "days"),
      })
    )
    return (this.upcomingFairs = _.times(3, () =>
      fabricate("fair", {
        profile: unpublished_profile,
        id: _.uniqueId("upcoming"),
        is_published: true,
        has_full_feature: true,
        has_listing: true,
        organizer: null,
        end_at: moment().add(10, "days"),
      })
    ))
  })

  return describe("with fairs", function () {
    beforeEach(function () {
      this.res = { render: sinon.stub(), locals: { sd: sinon.stub() } }
      this.fairs = _.flatten([
        this.currentFairs,
        this.pastFairs,
        this.upcomingFairs,
      ])
      return routes.__set__("metaphysics", () =>
        Q.resolve({ fairs: this.fairs })
      )
    })

    return it("fetches the fairs and renders the index template", function () {
      return routes.index({}, this.res).then(() => {
        this.res.render.args[0][1].currentFairs.should.eql(this.currentFairs)
        this.res.render.args[0][1].upcomingFairs.should.eql(this.upcomingFairs)
        return this.res.render.args[0][1].pastFairs.should.eql(this.pastFairs)
      })
    })
  })
})
