import rewire from "rewire"
import sinon from "sinon"
import { sameOriginMiddleware } from "../../../lib/middleware/sameOrigin"

describe("Same origin middleware", function () {
  beforeEach(function () {
    this.req = {}
    this.res = {
      headers: [],
      set(name, value) {
        return (this.headers[name] = value)
      },
    }
    this.next = sinon.stub()
  })

  it("adds x-frame-options header", function () {
    this.req.get = () => "http:"
    sameOriginMiddleware(this.req, this.res, this.next)
    this.res.headers["X-Frame-Options"].should.equal("SAMEORIGIN")
  })
})
