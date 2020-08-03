/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")

describe("splitTestMiddleware", function () {
  before(function () {
    return benv.setup(done => {
      this.splitTestMiddleware = rewire("../middleware")
      this.splitTestMiddleware.__set__("qs", require("qs"))
      return this.splitTestMiddleware.__set__("runningTests", {
        header_design: {
          key: "header_design",
          outcomes: { old: 0, new: 100 },
          edge: "old",
        },

        some_other_test: {
          key: "some_other_test",
          outcomes: { old: 100, new: 0 },
          edge: "new",
        },
      })
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    this.req = { cookies: {} }
    return (this.res = { cookie: sinon.stub(), locals: { sd: {} } })
  })

  it("sets up all the tests, and sets corresponding locals/cookies", function (done) {
    return this.splitTestMiddleware(this.req, this.res, () => {
      this.res.locals.sd.should.eql({
        HEADER_DESIGN: "new",
        SOME_OTHER_TEST: "old",
      })
      this.res.cookie.args
        .map(xs => xs.slice(0, 2))
        .should.eql([
          ["split_test--header_design", "new"],
          ["split_test--some_other_test", "old"],
        ])
      return done()
    })
  })

  describe("when admin", function () {
    beforeEach(function () {
      return (this.req = {
        cookies: {},
        user: {
          isAdmin() {
            return true
          },
        },
      })
    })

    return it("drops the tests into the edge outcomes", function (done) {
      return this.splitTestMiddleware(this.req, this.res, () => {
        this.res.locals.sd.should.eql({
          HEADER_DESIGN: "old",
          SOME_OTHER_TEST: "new",
        })
        return done()
      })
    })
  })

  describe("when admin, with overriding params", function () {
    beforeEach(function () {
      this.res = { cookie: sinon.stub(), locals: { sd: {} } }
      return (this.req = {
        cookies: {},
        user: {
          isAdmin() {
            return true
          },
        },
        query: {
          split_test: {
            header_design: "new",
          },
        },
      })
    })

    return it("sets the tests to the query", function (done) {
      return this.splitTestMiddleware(this.req, this.res, () => {
        this.res.locals.sd.should.eql({
          HEADER_DESIGN: "new",
          SOME_OTHER_TEST: "new",
        })
        return done()
      })
    })
  })

  return describe("no tests", function () {
    before(function () {
      return this.splitTestMiddleware.__set__("runningTests", {})
    })

    return it("just passes on to next", function (done) {
      return this.splitTestMiddleware(this.req, this.res, () => {
        this.res.locals.sd.should.eql({})
        return done()
      })
    })
  })
})
