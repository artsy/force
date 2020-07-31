/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const _ = require("underscore")
const Q = require("bluebird-q")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const moment = require("moment")
const routes = rewire("../routes")
const CurrentUser = require("../../../models/current_user.coffee")
const FairOrganizer = require("../../../models/fair_organizer.coffee")
const Fair = require("../../../models/fair.coffee")
const Fairs = require("../../../collections/fairs.coffee")
const Profile = require("../../../models/profile.coffee")

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

describe("Fair Organization routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.fairOrg = new FairOrganizer(fabricate("fair_organizer"))
    this.fair = new Fair(fabricate("fair"))
    this.req = { params: { id: "the-armory-show-temp" }, query: {} }
    this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: { API_URL: "http://localhost:5000", FAIR_ORG: this.fairOrg },
        fairOrg: this.fairOrg,
        profile: new Profile(fabricate("fair_organizer_profile")),
      },
    }
    this.next = sinon.stub()

    return (this.clock = sinon.useFakeTimers())
  })

  afterEach(function () {
    Backbone.sync.restore()
    return this.clock.restore()
  })

  describe("#fetchFairOrgData", function () {
    beforeEach(function () {
      return (this.fairs = new Fairs([
        fabricate("fair", {
          name: _.uniqueId(),
          id: _.uniqueId(),
          _id: _.uniqueId(),
        }),
        fabricate("fair", {
          name: _.uniqueId(),
          id: _.uniqueId(),
          _id: _.uniqueId(),
        }),
        fabricate("fair", {
          name: _.uniqueId(),
          id: _.uniqueId(),
          _id: _.uniqueId(),
        }),
      ]))
    })

    it("fetches the fair organizer and associated fairs", function () {
      let next
      Backbone.sync.onCall(0).yieldsTo("success", this.fairs.models)
      Backbone.sync.yieldsTo("success")
      return routes
        .fetchFairOrgData(this.req, this.res, (next = sinon.stub()))
        .then(() => {
          this.res.locals.sd.FAIR_IDS.should.eql(this.fairs.pluck("_id"))
          return this.res.locals.sd.FAIR_ORGANIZER.should.eql(
            this.fairOrg.toJSON()
          )
        })
    })

    it("redirects to the fair if there is a current fair with public profile", function () {
      let next
      const fair = this.fairs.first()
      fair.set({
        autopublish_artworks_at: moment().utc().subtract(5, "days").format(),
        start_at: moment().utc().subtract(3, "days").format(),
        end_at: moment().utc().add(3, "days").format(),
      })

      Backbone.sync.onCall(0).yieldsTo("success", this.fairs.models)
      Backbone.sync
        .onCall(1)
        .yieldsTo("success")
        .returns(
          Q.promise((resolve, reject) => resolve(fabricate("fair_profile")))
        )
      Backbone.sync.yieldsTo("success")
      return routes
        .fetchFairOrgData(this.req, this.res, (next = sinon.stub()))
        .then(() => {
          return this.res.redirect.args[0][0].should.equal("/the-armory-show")
        })
    })

    it("redirects to the fair if there is a current fair with private profile", function () {
      let next
      const fair = this.fairs.first()
      fair.set({
        autopublish_artworks_at: moment().utc().subtract(5, "days").format(),
        start_at: moment().utc().subtract(3, "days").format(),
        end_at: moment().utc().add(3, "days").format(),
      })

      Backbone.sync.onCall(0).yieldsTo("success", this.fairs.models)
      Backbone.sync
        .onCall(1)
        .yieldsTo("error")
        .returns(Q.promise((resolve, reject) => reject()))
      Backbone.sync.yieldsTo("success")
      return routes
        .fetchFairOrgData(this.req, this.res, (next = sinon.stub()))
        .then(() => {
          this.res.redirect.notCalled.should.be.ok()
          this.res.locals.sd.FAIR_IDS.should.eql(this.fairs.pluck("_id"))
          return this.res.locals.sd.FAIR_ORGANIZER.should.eql(
            this.fairOrg.toJSON()
          )
        })
    })

    return it("sets showName if the all the fairs dont have identical names", function () {
      let next
      const fair = this.fairs.first()
      fair.set({ name: "modern-fair" })
      Backbone.sync.onCall(0).yieldsTo("success", this.fairs.models)
      Backbone.sync.yieldsTo("success")
      return routes
        .fetchFairOrgData(this.req, this.res, (next = sinon.stub()))
        .then(() => {
          return this.res.locals.showName.should.be.true()
        })
    })
  })

  return describe("#overview", function () {
    it("next is called without a fair org", function () {
      let next
      delete this.res.locals.fairOrg
      routes.overview(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })

    return it("renders the overview template", function () {
      routes.overview(this.req, this.res)
      return this.res.render.args[0][0].should.equal("overview")
    })
  })
})
