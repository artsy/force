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
  beforeEach(function () {
    this.req = {
      profile: new Profile(
        fabricate("profile", { owner_type: "Fair", owner: fabricate("fair") })
      ),
      params: {
        id: "the-armory-show-2013",
      },
    }
    this.res = {
      locals: {
        sd: {},
      },
      render: sinon.stub(),
    }
    return (this.next = sinon.stub())
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

    return it("assigns a fair model to locals", function () {
      routes.assignFair(this.req, this.res, this.next)
      return _.defer(() => {
        return this.res.locals.fair.get("name").should.equal("Armory Show 2013")
      })
    })
  })

  describe("#visitors", function () {
    beforeEach(function () {
      return (this.res.locals.fair = new Fair(fabricate("fair")))
    })

    return it("renders the visitors page", function () {
      routes.visitors(this.req, this.res, this.next)
      this.res.render.called.should.be.true()
      return this.res.render.args[0][0].should.eql("visitors")
    })
  })

  describe("#info", function () {
    beforeEach(function () {
      return (this.res.locals.fair = new Fair(fabricate("fair")))
    })

    return it("renders the navigation page", function () {
      routes.info(this.req, this.res, this.next)
      this.res.render.called.should.be.true()
      return this.res.render.args[0][0].should.eql("index")
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

      this.res.locals.fair = new Fair(fabricate("fair"))
      return sinon.stub(Backbone, "sync").yieldsTo("success", fairEvents)
    })

    afterEach(() => Backbone.sync.restore())

    return it("renders the events page", function () {
      routes.events(this.req, this.res, this.next)
      this.res.render.called.should.be.true()
      this.res.render.args[0][0].should.eql("events")
      // all events are on the same day, check to make sure there are 4 events
      const { eventsByDay } = this.res.render.args[0][1]
      const dayKey = _.first(_.keys(eventsByDay))
      return eventsByDay[dayKey].length.should.eql(4)
    })
  })

  describe("#singleEvent", function () {
    beforeEach(function () {
      this.res.locals.fair = new Fair(fabricate("fair"))
      return sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", fabricate("fair_event"))
    })

    afterEach(() => Backbone.sync.restore())

    return it("renders the single event page", function () {
      routes.singleEvent(this.req, this.res, this.next)
      this.res.render.called.should.be.true()
      this.res.render.args[0][0].should.eql("event")
      return this.res.render.args[0][1].event.get("name").should.eql("Welcome")
    })
  })

  return describe("#infoProgramming", function () {
    beforeEach(function () {
      this.res.locals.fair = new Fair(fabricate("fair"))
      return sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", fabricate("article"))
    })

    afterEach(() => Backbone.sync.restore())

    return xit("renders the article page", function () {
      routes.infoProgramming(this.req, this.res, this.next)
      _.keys(Backbone.sync.args[0][2]["data"]).should.containEql(
        "fair_programming_id"
      )
      this.res.render.called.should.be.true()
      return this.res.render.args[0][0].should.eql("article")
    })
  })
})
