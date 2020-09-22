/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const routes = require("../routes")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../models/profile")
const Fair = require("../../../models/fair")
const FairEvent = require("../../../models/fair_event")
const FairEvents = require("../../../collections/fair_events")

describe("FairInfo routes", function () {
  let req
  let res
  let next
  beforeEach(function () {
    req = {
      profile: new Profile(
        fabricate("profile", { owner_type: "Fair", owner: fabricate("fair") })
      ),
      params: {
        id: "the-armory-show-2013",
      },
    }
    res = {
      locals: {
        sd: {},
      },
      render: sinon.stub(),
    }
    next = sinon.stub()
  })

  describe("#assignFair", function () {
    before(() =>
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", {})
        .onCall(0)
        .yieldsTo("success", fabricate("fair"))
    )

    after(() => Backbone.sync.restore())

    it("assigns a fair model to locals", function (done) {
      routes.assignFair(req, res, next)
      _.defer(() => {
        res.locals.fair.get("name").should.equal("Armory Show 2013")
        done()
      })
    })
  })

  xdescribe("#visitors", function () {
    beforeEach(function () {
      res.locals.fair = new Fair(fabricate("fair"))
    })

    it("renders the visitors page", function () {
      routes.visitors(req, res, next)
      res.render.called.should.be.true()
      res.render.args[0][0].should.eql("visitors")
    })
  })

  describe("#info", function () {
    beforeEach(function () {
      res.locals.fair = new Fair(fabricate("fair"))
    })

    it("renders the navigation page", function () {
      routes.info(req, res, next)
      res.render.called.should.be.true()
      res.render.args[0][0].should.eql("index")
    })
  })

  describe("#events", function () {
    beforeEach(function () {
      const fairEvents = [
        fabricate("fair_event"),
        fabricate("fair_event"),
        fabricate("fair_event"),
        fabricate("fair_event"),
      ]

      res.locals.fair = new Fair(fabricate("fair"))
      sinon.stub(Backbone, "sync").yieldsTo("success", fairEvents)
    })

    afterEach(() => Backbone.sync.restore())

    it("renders the events page", function () {
      routes.events(req, res, next)
      res.render.called.should.be.true()
      res.render.args[0][0].should.eql("events")
      // all events are on the same day, check to make sure there are 4 events
      const { eventsByDay } = res.render.args[0][1]
      const dayKey = _.first(_.keys(eventsByDay))
      eventsByDay[dayKey].length.should.eql(4)
    })
  })

  xdescribe("#singleEvent", function () {
    beforeEach(function () {
      res.locals.fair = new Fair(fabricate("fair"))
      sinon.stub(Backbone, "sync").yieldsTo("success", fabricate("fair_event"))
    })

    afterEach(() => Backbone.sync.restore())

    it("renders the single event page", function () {
      routes.singleEvent(req, res, next)
      res.render.called.should.be.true()
      res.render.args[0][0].should.eql("event")
      res.render.args[0][1].event.get("name").should.eql("Welcome")
    })
  })

  describe("#infoProgramming", function () {
    beforeEach(function () {
      res.locals.fair = new Fair(fabricate("fair"))
      sinon.stub(Backbone, "sync").yieldsTo("success", fabricate("article"))
    })

    afterEach(() => Backbone.sync.restore())

    xit("renders the article page", function () {
      routes.infoProgramming(req, res, next)
      _.keys(Backbone.sync.args[0][2]["data"]).should.containEql(
        "fair_programming_id"
      )
      res.render.called.should.be.true()
      res.render.args[0][0].should.eql("article")
    })
  })
})
