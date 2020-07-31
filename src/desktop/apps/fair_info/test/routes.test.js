/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Q = require("bluebird-q")
const routes = require("../routes")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Profile = require("../../../models/profile")
const Fair = require("../../../models/fair")
const FairEvents = require("../../../collections/fair_events")

describe("FairInfo routes", function () {
  describe("#assignFair", function () {
    beforeEach(function () {
      this.req = {
        params: {
          id: "the-armory-show-2013",
        },
      }

      this.res = {
        locals: {
          profile: new Profile(
            fabricate("profile", {
              owner_type: "Fair",
              owner: fabricate("fair"),
            })
          ),
          sd: {},
          render: sinon.stub(),
        },
      }

      this.next = sinon.stub()

      return sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", {})
        .onCall(0)
        .yieldsTo("success", fabricate("fair"))
        .returns(Q.resolve({}))
    })

    afterEach(() => Backbone.sync.restore())

    return it("assigns a fair model to locals", function () {
      return routes.assignFair(this.req, this.res, this.next).then(() => {
        return this.res.locals.fair.get("name").should.equal("Armory Show 2013")
      })
    })
  })

  return describe("routes functions", function () {
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
          sd: { FAIR: fabricate("fair", { _id: "1234567890" }) },
        },
        render: sinon.stub(),
      }

      return (this.next = sinon.stub())
    })

    describe("#visitor", () =>
      it("should render visitors page", function () {
        routes.visitors(this.req, this.res)
        this.res.render.called.should.be.true
        return this.res.render.args[0][0].should.equal("visitors")
      }))

    describe("#events", function () {
      beforeEach(function () {
        this.res.locals.fair = fabricate("fair")
        return sinon
          .stub(Backbone, "sync")
          .yieldsTo("success", [
            fabricate("fair_event"),
            fabricate("fair_event", { name: "my event" }),
          ])
      })

      afterEach(() => Backbone.sync.restore())

      return it("renders events page", function () {
        routes.events(this.req, this.res)
        this.res.render.called.should.be.true
        this.res.render.args[0][0].should.equal("events")
        this.res.render.args[0][1]["fairEvents"].models.length.should.equal(2)
        return this.res.render.args[0][1]["fairEvents"].models[0]
          .get("name")
          .should.equal("Welcome")
      })
    })

    return describe("programming", function () {
      beforeEach(function () {
        this.res.locals.fair = fabricate("fair")
        return sinon
          .stub(Backbone, "sync")
          .yieldsTo("success", [fabricate("article")])
      })

      afterEach(() => Backbone.sync.restore())

      return xit("renders the article page", function () {
        routes.programming(this.req, this.res, this.next)
        this.res.render.called.should.be.true
        this.res.render.args[0][0].should.equal("article")
        return _.keys(
          Backbone.sync.args[0][2]["data"].should.containEql(
            "fair_programming_id"
          )
        )
      })
    })
  })
})

describe("#info", function () {
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
      redirect: sinon.stub(),
    }

    return (this.next = sinon.stub())
  })

  return it("should redirect to /info/visitors", function () {
    routes.info(this.req, this.res)
    return this.res.redirect.args[0][0].should.equal("info/visitors")
  })
})
