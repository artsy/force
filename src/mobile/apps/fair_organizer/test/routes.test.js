/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const moment = require("moment")
const routes = rewire("../routes")
const CurrentUser = require("../../../models/current_user.coffee")
const Fair = require("../../../models/fair.coffee")
const Fairs = require("../../../collections/fairs.coffee")
const FairOrganizer = require("../../../models/fair_organizer.coffee")
const Profile = require("../../../models/profile.coffee")

describe("Fair Organization routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.fairOrg = new FairOrganizer(fabricate("fair_organizer"))
    this.fair = new Fair(fabricate("fair"))
    this.req = {
      params: { id: "the-armory-show-temp" },
      query: {},
      profile: new Profile(fabricate("fair_organizer_profile")),
    }
    this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: { API_URL: "http://localhost:5000", FAIR_ORG: this.fairOrg },
        fairOrg: this.fairOrg,
        profile: new Profile(fabricate("fair_organizer_profile")),
      },
    }
    return (this.next = sinon.stub())
  })

  afterEach(() => Backbone.sync.restore())

  describe("#overview", function () {
    it("next is called without a fair org", function () {
      let next
      delete this.res.locals.fairOrg
      routes.overview(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })

    return it("renders the overview template", function () {
      routes.overview(this.req, this.res)
      return this.res.render.args[0][0].should.equal("index")
    })
  })

  return describe("#fetchFairOrgData", function () {
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

    return it("redirects to the fair if there is a current fair", function () {
      let next
      const fair = this.fairs.first()
      fair.set({
        autopublish_artworks_at: moment().utc().subtract(5, "days").format(),
        start_at: moment().utc().subtract(3, "days").format(),
        end_at: moment().utc().add(3, "days").format(),
      })
      routes.fetchFairOrgData(this.req, this.res, (next = sinon.stub()))
      Backbone.sync.args[0][2].success(this.fairs.models)
      return this.res.redirect.args[0][0].should.equal("/the-armory-show")
    })
  })
})
