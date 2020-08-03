/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Items = require("../../collections/items")

describe("Items", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.items = new Items([fabricate("featured_link"), {}], {
      id: "foobar",
    }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#url", () =>
    it("should return the appropriate url", function () {
      this.items.id.should.equal("foobar")
      return this.items.url().should.containEql("/api/v1/set/foobar/items")
    }))

  return describe("#model", () =>
    it("news up the appropriate class", function () {
      this.items.at(0).constructor.name.should.equal("FeaturedLink")
      return this.items.at(1).constructor.name.should.equal("Item")
    }))
})
