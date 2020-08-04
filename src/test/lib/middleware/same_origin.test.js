/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const sinon = require("sinon")
const sameOrign = rewire("../../../lib/middleware/same_origin")

describe("Same origin middleware", function () {
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

  return it("adds x-frame-options header", function () {
    this.req.get = () => "http:"
    sameOrign(this.req, this.res, this.next)
    return this.res.headers["X-Frame-Options"].should.equal("SAMEORIGIN")
  })
})
