/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const PageableCollection = require("../index")

const Fetch = {
  fetchUntilEnd() {
    return true
  },
}

class DerivedCollection extends PageableCollection {
  static initClass() {
    _.extend(this.prototype, Fetch)
  }
}
DerivedCollection.initClass()

describe("PageableCollection", function () {
  beforeEach(function () {
    return (this.collection = new PageableCollection())
  })

  return describe("#fetchUntilEnd", () =>
    it("is not implemented", function () {
      return (() => this.collection.fetchUntilEnd()).should.throw(
        "fetchUntilEnd is not implemented"
      )
    }))
})

describe("DerivedCollection", function () {
  beforeEach(function () {
    return (this.collection = new DerivedCollection())
  })

  return describe("#fetchUntilEnd", () =>
    it("does not throw", function () {
      return this.collection.fetchUntilEnd().should.be.true()
    }))
})
