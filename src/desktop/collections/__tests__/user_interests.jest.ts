import Backbone from "backbone"
const { UserInterests } = require("../user_interests")

describe("UserInterests", () => {
  let userInterests

  beforeEach(() => {
    Backbone.sync = jest.fn()

    userInterests = new UserInterests()
    userInterests.add({ id: "foo", interest: { id: "bar" } })
    userInterests.add({ id: "bar", interest: { id: "baz" } })
  })

  describe("#findByInterestId", () => {
    it("can find a userInterest by the interest id", () => {
      userInterests.findByInterestId("bar").id.should.equal("foo")
    })
  })

  describe("#addInterest", () => {
    it("accepts a model and adds a userInterest with it", () => {
      userInterests.length.should.equal(2)
      userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      userInterests.length.should.equal(3)
      expect(Backbone.sync).not.toBeCalled()
    })

    it("rejects duplicate models", () => {
      userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      userInterests.addInterest(new Backbone.Model({ id: "qux" }))
      userInterests.length.should.equal(3)
      expect(Backbone.sync).not.toBeCalled()
    })
  })

  describe("#parse", () => {
    it("ignores userInterests that are... *uninteresting*", () => {
      userInterests.reset(
        [
          { interest: null, interest_id: "foo" },
          { interest: "existy", interest_id: "bar" },
          { interest: "existy", interest_id: "baz" },
          { interest: null, interest_id: "qux" },
        ],
        { parse: true }
      )
      userInterests.pluck("interest_id").should.eql(["bar", "baz"])
    })
  })
})
