/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")

const OrderedSet = rewire("../../models/ordered_set.coffee")

class Items extends Backbone.Model {}

OrderedSet.__set__("Items", Items)

describe("OrderedSet", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    const fetch = () => ({
      then() {
        return sinon.stub()
      },
    })
    this.spiedFetch = sinon.spy(fetch)
    Items.prototype.fetch = this.spiedFetch
    return (this.orderedSet = new OrderedSet())
  })

  afterEach(() => Backbone.sync.restore())

  return xdescribe("#fetchItems", function () {
    // FIXME: Promises do not resolve
    it("sets the items attribute", function () {
      this.orderedSet.fetchItems()
      return this.orderedSet.get("items").constructor.name.should.equal("Items")
    })

    it("returns a promise", function () {
      return this.orderedSet.fetchItems()
    })

    return it("supports caching", function () {
      this.orderedSet.fetchItems(true, 60)
      this.spiedFetch.calledOnce.should.be.ok()
      return this.spiedFetch.lastCall.args.should.eql([
        { cache: true, cacheTime: 60 },
      ])
    })
  })
})
