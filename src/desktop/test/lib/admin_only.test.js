const sinon = require("sinon")
const Backbone = require("backbone")
const { adminOnly } = require("../../lib/admin_only")

describe("adminOnly middleware", () => {
  let next
  let req

  beforeEach(() => {
    next = sinon.stub()
  })

  describe("is an admin", () => {
    beforeEach(() => {
      req = { user: new Backbone.Model({ type: "Admin" }) }
    })

    it("passes through without error", () => {
      adminOnly(req, {}, next)
      const res = typeof next.args[0][0] === "undefined"
      res.should.be.true()
    })
  })

  describe("is not an admin", () =>
    it("passes through with the appropriate error", () => {
      adminOnly({}, {}, next)
      next.args[0][0].message.should.equal("You must be logged in as an admin")
      next.args[0][0].status.should.equal(403)
    }))
})
