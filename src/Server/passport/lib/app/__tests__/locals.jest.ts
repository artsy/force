const locals = require("../locals")

describe("locals", function () {
  let req
  let res
  let next

  beforeEach(function () {
    req = { query: {} }
    res = { locals: { sd: {} } }
    next = jest.fn()
  })

  it("escapes the error message html", function () {
    req.query.error = "<img src=alert(hello) />"
    locals(req, res, next)
    expect(res.locals.error).toEqual("&lt;img src=alert(hello) /&gt;")
  })
})
