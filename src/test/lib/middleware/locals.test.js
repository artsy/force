/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const sinon = require("sinon")
const middleware = require("../../../lib/middleware/locals")

describe("locals middleware", function () {
  it("adds a session id", function () {
    let req, res
    middleware(
      (req = { url: "localhost:3000", session: {}, get() {} }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    req.session.id.length.should.be.above(0)
    return res.locals.sd.SESSION_ID.should.equal(req.session.id)
  })

  it("adds the user agent", function () {
    let req, res
    middleware(
      (req = {
        url: "localhost:3000",
        get() {
          return "foobar<script>omg</script>"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.userAgent.should.equal(
      "foobar%3Cscript%3Eomg%3C/script%3E"
    )
  })

  it("current_path does not include query params", function () {
    let req, res
    middleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "foobar"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.sd.CURRENT_PATH.should.equal("/foo")
  })

  it("flags eigen", function () {
    let req, res
    middleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "Something something Artsy-Mobile"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.sd.EIGEN.should.be.ok()
  })

  it('adds the referrer "medium"', function () {
    let req, res
    middleware(
      (req = {
        url: "localhost:3000",
        get() {
          return "https://www.google.com/"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.sd.MEDIUM.should.equal("search")
  })

  it("flags reflection", function () {
    let req, res
    middleware(
      (req = {
        url: "localhost:3000/foo?bar=baz",
        get() {
          return "Artsy/Reflection"
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.sd.REFLECTION.should.be.ok()
  })

  return it("works if there is no user agent", function () {
    let req, res
    middleware(
      (req = {
        url: "",
        get() {
          return null
        },
      }),
      (res = { locals: { sd: {} } }),
      function () {}
    )
    return res.locals.sd.EIGEN.should.equal(false)
  })
})
