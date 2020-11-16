import Backbone from "backbone"
import sinon from "sinon"
import { localsMiddleware } from "../../../lib/middleware/locals"

describe("locals middleware", function () {
  it("adds a session id", function () {
    let req, res
    localsMiddleware(
      (req = { url: "localhost:3000", session: {}, get() {} }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    req.session.id.length.should.be.above(0)
    res.locals.sd.SESSION_ID.should.equal(req.session.id)
  })

  it("adds the user agent", function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "localhost:3000",
        get() {
          return "foobar<script>omg</script>"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.userAgent.should.equal("foobar%3Cscript%3Eomg%3C/script%3E")
  })

  it("current_path does not include query params", function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "foobar"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.sd.CURRENT_PATH.should.equal("/foo")
  })

  it("flags eigen", function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "Something something Artsy-Mobile"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.sd.EIGEN.should.be.ok()
  })

  it('adds the referrer "medium"', function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "localhost:3000",
        get() {
          return "https://www.google.com/"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.sd.MEDIUM.should.equal("search")
  })

  it("flags reflection", function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "Artsy/Reflection"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.sd.REFLECTION.should.be.ok()
  })

  it("works if there is no user agent", function () {
    let req, res
    localsMiddleware(
      (req = {
        url: "",
        get() {
          return null
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    res.locals.sd.EIGEN.should.equal(false)
  })
})
