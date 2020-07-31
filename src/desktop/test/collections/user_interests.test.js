/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const UserInterests = require("../../collections/user_interests")

describe("UserInterests", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    this.userInterests = new UserInterests()
    this.userInterests.add({ id: "foo", interest: { id: "bar" } })
    return this.userInterests.add({ id: "bar", interest: { id: "baz" } })
  })

  afterEach(() => Backbone.sync.restore())

  describe("#findByInterestId", () =>
    it("can find a userInterest by the interest id", function () {
      return this.userInterests.findByInterestId("bar").id.should.equal("foo")
    }))

  describe("#addInterest", function () {
    it("accepts a model and adds a userInterest with it", function () {
      this.userInterests.length.should.equal(2)
      this.userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      this.userInterests.length.should.equal(3)
      return Backbone.sync.called.should.be.false()
    })

    return it("rejects duplicate models", function () {
      this.userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      this.userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      this.userInterests.length.should.equal(3)
      return Backbone.sync.callCount.should.equal(0)
    })
  })

  return describe("#parse", () =>
    it("ignores userInterests that are... *uninteresting*", function () {
      this.userInterests.reset(
        [
          { interest_id: "foo", interest: null },
          { interest_id: "bar", interest: "existy" },
          { interest_id: "baz", interest: "existy" },
          { interest_id: "qux", interest: null },
        ],
        { parse: true }
      )
      return this.userInterests.pluck("interest_id").should.eql(["bar", "baz"])
    }))
})
