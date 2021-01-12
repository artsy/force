const sinon = require("sinon")
const routes = require("../routes")

describe("Page routes", () => {
  describe("#index", () => {
    it("redirects the collector selling FAQ to /consign", async () => {
      const req = { params: { id: "collector-faqs-selling-on-artsy" } }
      const res = { redirect: sinon.stub() }
      await routes.index(req, res)
      res.redirect.args[0][0].should.equal(301)
      res.redirect.args[0][1].should.equal("/consign")
    })
  })
})
