/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const routes = require("../routes")
const sinon = require("sinon")
const Backbone = require("backbone")
const CurrentUser = require("../../../models/current_user")
const { fabricate } = require("@artsy/antigravity")

describe("/user", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { url: "/user/edit" }
    return (this.res = {
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
        routes.refresh(this.req, this.res)
        return Backbone.sync.args[0][2].success(this.req.user)
      })

      return it("calls req.login to refresh the session", function () {
        return this.req.login.calledOnce.should.be.true()
      })
    })
  })

  return describe("#settings", () =>
    it("redirects to the home page without a current user", function () {
      routes.settings(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/login?redirectTo=%2Fuser%2Fedit"
      )
    }))
})
