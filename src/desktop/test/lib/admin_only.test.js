/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const adminOnly = require("../../lib/admin_only")

describe("adminOnly middleware", function () {
  beforeEach(function () {
    return (this.next = sinon.stub())
  })

  describe("is an admin", function () {
    beforeEach(function () {
      return (this.req = { user: new Backbone.Model({ type: "Admin" }) })
    })

    return it("passes through without error", function () {
      adminOnly(this.req, {}, this.next)
      return _.isUndefined(this.next.args[0][0]).should.be.true()
    })
  })

  return describe("is not an admin", () =>
    it("passes through with the appropriate error", function () {
      adminOnly({}, {}, this.next)
      this.next.args[0][0].message.should.equal(
        "You must be logged in as an admin"
      )
      return this.next.args[0][0].status.should.equal(403)
    }))
})
