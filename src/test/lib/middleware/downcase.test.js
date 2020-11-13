import sinon from "sinon"
import { downcaseMiddleware } from "../../../lib/middleware/downcase"

describe("downcase middleware", function () {
  beforeEach(function () {
    this.req = { _parsedUrl: { search: null } }
    this.res = { redirect: sinon.stub() }
    this.next = sinon.stub()
  })

  it("should not redirect lowercase paths", function () {
    this.req._parsedUrl.pathname = "/foo/bar"
    downcaseMiddleware(this.req, this.res, this.next)

    this.res.redirect.called.should.be.false()
    this.next.called.should.be.true()
  })

  it("should redirect paths with uppercase letters", function () {
    this.req._parsedUrl.pathname = "/Foo/Bar"
    downcaseMiddleware(this.req, this.res, this.next)

    this.res.redirect.called.should.be.true()
    this.next.called.should.be.false()
    this.res.redirect.args[0].should.eql([301, "/foo/bar"])
  })

  it("should not lowercase the query string", function () {
    this.req._parsedUrl.search = "?Bar=Baz"
    this.req._parsedUrl.pathname = "/Foo"
    downcaseMiddleware(this.req, this.res, this.next)

    this.res.redirect.called.should.be.true()
    this.next.called.should.be.false()
    this.res.redirect.args[0].should.eql([301, "/foo?Bar=Baz"])
  })
})
