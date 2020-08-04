/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const runningTests = {
  // Example test
  header_design: {
    key: "header_design",
    outcomes: {
      old: 80,
      new: 20,
    },
    edge: "new",
  },
}

describe("SplitTest", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      this.SplitTest = require("../split_test.coffee")
      this.setStub = sinon.stub(this.SplitTest.prototype, "set").returnsArg(0)
      return done()
    })
  })

  afterEach(function () {
    this.setStub.restore()
    return benv.teardown()
  })

  it("requires probabilities to add up to 100", function () {
    ;(() =>
      new this.SplitTest({
        key: "foobar",
        outcomes: { foo: 50, bar: 40 },
      })).should.throw(
      "Your probability values for outcomes must add up to 100"
    )
    return (() =>
      new this.SplitTest({
        key: "foobar",
        outcomes: { foo: 50, bar: 50 },
      })).should.not.throw(
      "Your probability values for outcomes must add up to 100"
    )
  })

  it("with equal weighting, requires outcomes to be an array with at least 2 entries", function () {
    ;(() =>
      new this.SplitTest({
        key: "foobar",
        weighting: "equal",
        outcomes: { foo: 50, bar: 40 },
      })).should.throw("The `outcomes` param must be an array of > 1")
    ;(() =>
      new this.SplitTest({
        key: "foobar",
        weighting: "equal",
        outcomes: ["foo"],
      })).should.throw("The `outcomes` param must be an array of > 1")
    return (() =>
      new this.SplitTest({
        key: "foobar",
        weighting: "equal",
        outcomes: ["foo", "bar"],
      })).should.not.throw("The `outcomes` param must be an array of > 1")
  })

  describe("#_key", () =>
    it("sets a key for the test which is used for the cookie and as an analytics property", function () {
      const test = new this.SplitTest({
        key: "foobar",
        outcomes: { foo: 0, bar: 100 },
      })
      return test._key().should.equal("split_test--foobar")
    }))

  describe("#cssClass", () =>
    it("returns a string that is usable as a CSS class", function () {
      const test = new this.SplitTest({
        key: "foobar",
        outcomes: { foo: 0, bar: 100 },
      })
      test.outcome().should.equal("bar")
      return test.cssClass().should.equal("is-splittest-foobar--bar")
    }))

  describe("logged in admin", function () {
    beforeEach(function () {
      return (this.adminStub = sinon
        .stub(this.SplitTest.prototype, "admin")
        .returns(true))
    })

    afterEach(function () {
      return this.adminStub.restore()
    })

    return it("presents the admin with edge functionality", function () {
      const adminTest = new this.SplitTest({
        key: "foobar",
        edge: "baz",
        outcomes: { baz: 0, qux: 100 },
      })
      adminTest.admin().should.be.true()
      return adminTest.outcome().should.equal("baz")
    })
  })

  return describe("reflection", function () {
    beforeEach(function () {
      return (this.reflectionStub = sinon
        .stub(this.SplitTest.prototype, "reflection")
        .returns(true))
    })

    afterEach(function () {
      return this.reflectionStub.restore()
    })

    it("outcome is set to control group if request comes from Reflection", function () {
      const test = new this.SplitTest({
        key: "foobar",
        edge: "baz",
        outcomes: { control: 10, qux: 90 },
      })
      return test.outcome().should.equal("control")
    })

    return it("outcome should be set to specified control group key", function () {
      const test = new this.SplitTest({
        key: "foobar",
        edge: "baz",
        control_group: "old",
        outcomes: { old: 10, qux: 90 },
      })
      return test.outcome().should.equal("old")
    })
  })
})
