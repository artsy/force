import rewire from "rewire"
import sinon from "sinon"
const rewiredEnsureSsl = rewire("../../../lib/middleware/ensureSsl")
const { ensureSslMiddleware } = rewiredEnsureSsl

describe("Ensure SSL middleware", function () {
  beforeEach(function () {
    rewiredEnsureSsl.__set__("APP_URL", "https://foobart.sy")
    this.req = { params: {}, logout: sinon.stub(), url: "/terms" }
    this.res = { redirect: sinon.stub() }
  })

  it("redirects Heroku http requests to https", function () {
    this.req.get = () => "http:"
    ensureSslMiddleware(this.req, this.res)
    this.res.redirect.args[0].should.eql([301, "https://foobart.sy/terms"])
  })

  it("redirects normal http requests to https", function () {
    this.req.get = () => ""
    this.req.protocol = "http:"
    ensureSslMiddleware(this.req, this.res, function () {})
    this.res.redirect.args[0].should.eql([301, "https://foobart.sy/terms"])
  })

  it("does not redirect https to https causing an infinite loop", function () {
    let next
    this.req.get = () => "https"
    ensureSslMiddleware(this.req, this.res, (next = sinon.stub()))
    next.called.should.be.ok()
  })
})
