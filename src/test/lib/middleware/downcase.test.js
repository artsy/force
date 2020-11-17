/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const downcase = require("../../../lib/middleware/downcase")

describe("downcase middleware", function () {
  beforeEach(function () {
    this.req = { _parsedUrl: { search: null } }
    this.res = { redirect: sinon.stub() }
    return (this.next = sinon.stub())
  })

  it("should not redirect lowercase paths", function () {
    this.req._parsedUrl.pathname = "/foo/bar"
    downcase(this.req, this.res, this.next)

    this.res.redirect.called.should.be.false()
    return this.next.called.should.be.true()
  })

  it("should redirect paths with uppercase letters", function () {
    this.req._parsedUrl.pathname = "/Foo/Bar"
    downcase(this.req, this.res, this.next)

    this.res.redirect.called.should.be.true()
    this.next.called.should.be.false()
    return this.res.redirect.args[0].should.eql([301, "/foo/bar"])
  })

  return it("should not lowercase the query string", function () {
    this.req._parsedUrl.search = "?Bar=Baz"
    this.req._parsedUrl.pathname = "/Foo"
    downcase(this.req, this.res, this.next)

    this.res.redirect.called.should.be.true()
    this.next.called.should.be.false()
    return this.res.redirect.args[0].should.eql([301, "/foo?Bar=Baz"])
  })
})
