/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const rewire = require("rewire")
const routes = rewire("../routes.coffee")
const sinon = require("sinon")
const moment = require("moment")

//
// Tests routes and the rendered template
//
describe("Unsupported Browser", function () {
  beforeEach(function () {
    this.req = { params: {}, body: {} }
    return (this.res = {
      render: sinon.stub(),
      locals: { sd: {}, asset() {} },
      redirect: sinon.stub(),
      cookie: sinon.stub(),
    })
  })

  describe("#index", () =>
    it("renders an unsupported browser page", function () {
      routes.index(this.req, this.res)
      return this.res.render.args[0][0].should.equal("template")
    }))

  return describe("#continueAnyway", function () {
    it("sets a cookie the middleware uses to bypass the unsupported message", function () {
      routes.continueAnyway(this.req, this.res)
      return this.res.cookie.args[0][0].should.equal(
        "continue_with_bad_browser"
      )
    })

    it("sets the cookie to expire one day from now", function () {
      routes.continueAnyway(this.req, this.res)
      const today = new Date()
      const expireDate = new Date(this.res.cookie.args[0][2].expires)
      return moment(expireDate)
        .diff(today, "days", true)
        .should.be.approximately(1, 0.0001)
    })

    it("redirects to the root if no forward url is passed", function () {
      routes.continueAnyway(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal("/")
    })

    it("redirects to a form submitted forward url or passed", function () {
      this.req.body["redirect-to"] =
        "/artwork/matthew-abbott-lobby-and-supercomputer"
      routes.continueAnyway(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal(
        "/artwork/matthew-abbott-lobby-and-supercomputer"
      )
    })

    it("does not redirect to an external url", function () {
      this.req.body["redirect-to"] = "http://example.com"
      routes.continueAnyway(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal("/")
    })

    return it("defaults redirect to /", function () {
      routes.continueAnyway(this.req, this.res)
      return this.res.redirect.args[0][0].should.equal("/")
    })
  })
})
