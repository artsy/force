/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")

describe("Dismisser", function () {
  beforeEach(function () {
    this.Dismisser = rewire("../dismisser")
    this.Cookies = this.Dismisser.__get__("Cookies")

    const store = {}
    this.Cookies.set = (name, value) => (store[name] = value)
    this.Cookies.get = name => store[name]

    return (this.dismisser = new this.Dismisser({ name: "foobar", limit: 3 }))
  })

  describe("#dismiss", () =>
    it("pushes the value to the limit", function () {
      this.dismisser.get().should.equal(0)
      this.dismisser.dismissed().should.be.false()
      this.dismisser.dismiss()
      this.dismisser.get().should.equal(3)
      return this.dismisser.dismissed().should.be.true()
    }))

  return describe("#dismissed", () =>
    it("returns false until the limit is reached", function () {
      this.dismisser.dismissed().should.be.false()
      this.dismisser.get().should.equal(0)
      this.dismisser.tick()
      this.dismisser.dismissed().should.be.false()
      this.dismisser.get().should.equal(1)
      this.dismisser.tick()
      this.dismisser.dismissed().should.be.false()
      this.dismisser.get().should.equal(2)
      this.dismisser.tick()
      this.dismisser.dismissed().should.be.true()
      return this.dismisser.get().should.equal(3)
    }))
})
