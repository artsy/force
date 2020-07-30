/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const CurrentUser = require("../../../models/current_user")
const routes = require("../routes")

describe("/user", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { url: "/user/edit" }
    return (this.res = {
      set: sinon.stub(),
      json: sinon.stub(),
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: { sd: { API_URL: "http://localhost:5000" } },
    })
  })

  afterEach(() => Backbone.sync.restore())

  describe("#refresh", function () {
    it("redirects to the home page without a current user", function () {
      routes.refresh(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal("/")
    })

    return describe("with a logged in user", function () {
      beforeEach(function () {
        this.req = {
          user: new CurrentUser(fabricate("user")),
          login: sinon.stub(),
        }
        this.next = sinon.stub()

        return Backbone.sync.onCall(0).returns(Promise.resolve(this.req.user))
      })

      return it("calls req.login to refresh the session", function () {
        return routes.refresh(this.req, this.res, this.next).then(() => {
          this.req.login.calledOnce.should.be.true()
          this.req.login.args[0][1]()
          this.next.calledOnce.should.not.be.true()
          this.req.login.args[0][1](true)
          return this.next.calledOnce.should.be.true()
        })
      })
    })
  })

  return describe("#settings", function () {
    it("redirects to the home page without a current user", function () {
      routes.settings(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/log_in?redirect_uri=/user/edit"
      )
    })

    return describe("with a logged in user", function () {
      beforeEach(function () {
        this.req = {
          user: new CurrentUser(
            fabricate("user", { type: "User", accessToken: "xxx" })
          ),
        }

        return Backbone.sync.onCall(0).returns(Promise.resolve(this.req.user))
      })

      return it("fetches the authentications", function () {
        return routes.settings(this.req, this.res).then(() => {
          Backbone.sync.args[1][1].url.should.containEql("/me/authentications")
          return Backbone.sync.args[1][2].data.access_token.should.equal("xxx")
        })
      })
    })
  })
})
