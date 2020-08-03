/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const app = rewire("../index")
const sinon = require("sinon")
const Backbone = require("backbone")

describe("clear cache app", function () {
  it("clears the cache when POSTed to", function () {
    let stub
    app.__set__("flushall", (stub = sinon.stub()))
    app.__get__("post")()
    return stub.called.should.be.ok()
  })

  return it("doesnt allow non-admins", function () {
    let next
    app.__get__("all")(
      { user: new Backbone.Model({ type: "User" }) },
      { status() {} },
      (next = sinon.stub())
    )
    next.args[0][0]
      .toString()
      .should.containEql("must be logged in as an admin")
    return next.args[0][0].status.should.eql(403)
  })
})
