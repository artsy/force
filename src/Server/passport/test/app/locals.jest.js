const sinon = require("sinon")
const locals = require("../../lib/app/locals")

describe("locals", function () {
  let req
  let res
  let next

  beforeEach(function () {
    req = { query: {} }
    res = { locals: { sd: {} } }
    next = sinon.stub()
  })

  it("escapes the error message html", function () {
    req.query.error = "<img src=alert(hello) />"
    locals(req, res, next)
    expect(res.locals.error).toEqual("&lt;img src=alert(hello) /&gt;")
  })

  // TODO: Reimplement removed tests
})
