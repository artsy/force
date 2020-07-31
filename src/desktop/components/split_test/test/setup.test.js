/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")

describe("setup", function () {
  before(function () {
    this.setup = rewire("../setup")
    return this.setup.__set__("runningTests", {
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

      local_test: {
        key: "local_test",
        outcomes: { old: 100, new: 0 },
        scope: "local",
      },
    })
  })

  beforeEach(function () {
    return (this.outcomeSpy = sinon.spy(
      this.setup.__get__("SplitTest").prototype,
      "get"
    ))
  })

  afterEach(function () {
    return this.outcomeSpy.restore()
  })

  return it("sets up all existing tests by calling outcome on them", function () {
    this.setup()
    return this.outcomeSpy.callCount.should.equal(2)
  })
})
