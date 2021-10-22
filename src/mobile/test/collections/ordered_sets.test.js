/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const OrderedSets = rewire("../../collections/ordered_sets")
const { fabricate } = require("@artsy/antigravity")

describe("OrderedSets", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.orderedSets = new OrderedSets({
      key: "browse:featured-genes",
    }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchSets", function () {
    beforeEach(function () {
      this.fetchSpy = sinon.stub()
      this.orderedSets.model.prototype.fetchItems = this.fetchSpy
      this.orderedSets.add([fabricate("ordered_set")])
      return this.orderedSets.add([fabricate("ordered_set")])
    })
    it("should call #fetchItems for set in the collection", function () {
      this.orderedSets.fetchSets()
      return this.fetchSpy.calledTwice.should.be.ok()
    })
    it("should return a promise", function () {
      return this.orderedSets
        .fetchSets()
        .constructor.name.should.equal("Promise")
    })
    return it("should be thennable", function () {
      return this.orderedSets.fetchSets()
    })
  })

  return describe("#fetchAll", function () {
    beforeEach(function () {
      this.orderedSets.fetch = sinon.stub().returns({
        then(cb) {
          return cb()
        },
      })
      return (this.orderedSets.model.prototype.fetchItems = sinon.stub())
    })
    it("triggers sync:complete when it is done", function (done) {
      this.orderedSets.on("sync:complete", done)
      this.orderedSets.fetchAll()
    })
    return it("should be thennable", function (done) {
      this.orderedSets.fetchAll().then(() => done())
    })
  })
})
