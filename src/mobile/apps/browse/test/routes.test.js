/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const routes = require("../routes")
const sinon = require("sinon")

describe("routes #to", function () {
  beforeEach(function () {
    this.req = { url: "http://artsy.net/foo/bar" }
    return (this.res = { redirect: sinon.stub() })
  })

  return it("redirects to a url", function () {
    routes.to("baz")(this.req, this.res, this.next)
    this.res.redirect.args[0][0].should.equal(301)
    return this.res.redirect.args[0][1].should.equal("baz")
  })
})
