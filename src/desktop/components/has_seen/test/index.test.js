/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")

describe("hasSeen", function () {
  beforeEach(function () {
    this.hasSeen = rewire("../index")
    return (this.Dismisser = this.hasSeen.__get__("Dismisser"))
  })

  return it("should return false the first time it is called, then true every time after that", function () {
    this.hasSeen("barbaz").should.be.false()
    const getStub = sinon.stub(this.Dismisser.prototype, "get").returns(1)
    this.hasSeen("barbaz").should.be.true()
    this.hasSeen("barbaz").should.be.true()
    return getStub.restore()
  })
})
