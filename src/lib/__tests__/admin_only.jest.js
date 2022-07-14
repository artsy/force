const sinon = require("sinon")
const { adminOnly } = require("../../lib/admin_only")

describe("adminOnly middleware", () => {
  let next
  let req

  beforeEach(() => {
    next = sinon.stub()
  })

  describe("is an admin", () => {
    beforeEach(() => {
      req = { user: { type: "Admin" } }
    })

    it("passes through without error", () => {
      adminOnly(req, {}, next)
      const res = typeof next.args[0][0] === "undefined"
      expect(res).toBeTruthy()
    })
  })

  describe("is not an admin", () =>
    it("passes through with the appropriate error", () => {
      adminOnly({}, {}, next)
      expect(next.args[0][0].message).toEqual(
        "You must be logged in as an admin"
      )
      expect(next.args[0][0].status).toEqual(403)
    }))
})
