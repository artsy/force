/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const sinon = require("sinon")
const hsts = rewire("../../../lib/middleware/hsts")

describe("HTTP strict transport security middleware", function () {
  beforeEach(function () {
    this.req = {}
    this.res = {
      headers: [],
      set(name, value) {
        return (this.headers[name] = value)
      },
    }
    return (this.next = sinon.stub())
  })

  return it("adds Strict-Transport-Security header", function () {
    hsts.__set__("APP_URL", "https://foobart.sy")
    this.req.get = () => "https"
    hsts(this.req, this.res, this.next)
    return this.res.headers["Strict-Transport-Security"].should.equal(
      "max-age=31536000"
    )
  })
})
