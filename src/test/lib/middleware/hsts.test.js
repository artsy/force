import rewire from "rewire"
import sinon from "sinon"
const rewiredHstsMiddleware = rewire("../../../lib/middleware/hsts")
const { hstsMiddleware } = rewiredHstsMiddleware

describe("HTTP strict transport security middleware", function () {
  beforeEach(function () {
    this.req = {}
    this.res = {
      headers: [],
      set(name, value) {
        this.headers[name] = value
      },
    }
    this.next = sinon.stub()
  })

  it("adds Strict-Transport-Security header", function () {
    rewiredHstsMiddleware.__set__("APP_URL", "https://foobart.sy")
    this.req.get = () => "https"
    hstsMiddleware(this.req, this.res, this.next)
    this.res.headers["Strict-Transport-Security"].should.equal(
      "max-age=31536000"
    )
  })
})
