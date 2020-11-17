/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const sinon = require("sinon")
const ensureSSL = rewire("../../../lib/middleware/ensure_ssl")

describe("Ensure SSL middleware", function () {
  beforeEach(function () {
    ensureSSL.__set__("APP_URL", "https://foobart.sy")
    this.req = { params: {}, logout: sinon.stub(), url: "/terms" }
    return (this.res = { redirect: sinon.stub() })
  })

  it("redirects Heroku http requests to https", function () {
    this.req.get = () => "http:"
    ensureSSL(this.req, this.res)
    return this.res.redirect.args[0].should.eql([
      301,
      "https://foobart.sy/terms",
    ])
  })

  it("redirects normal http requests to https", function () {
    this.req.get = () => ""
    this.req.protocol = "http:"
    ensureSSL(this.req, this.res, function () {})
    return this.res.redirect.args[0].should.eql([
      301,
      "https://foobart.sy/terms",
    ])
  })

  return it("does not redirect https to https causing an infinite loop", function () {
    let next
    this.req.get = () => "https"
    ensureSSL(this.req, this.res, (next = sinon.stub()))
    return next.called.should.be.ok()
  })
})
