/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const Backbone = require("backbone")
const setItems = require("../../../models/mixins/set_items")

class Model extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, setItems("FooModelName"))
  }
}
Model.initClass()

describe("Set Items Mixin", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.model = new Model())
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#fetchSetItems", function () {
    it("fetches a set of items based on the mixed in model", function () {
      this.model.set({ id: "foobar" })
      this.model.fetchSetItems()
      Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/sets?owner_type=FooModelName&owner_id=foobar"
      )
      Backbone.sync.args[0][2].success([
        fabricate("set", { display_on_martsy: true }),
      ])
      return Backbone.sync.args[1][2].url.should.match(
        new RegExp(`api/v1/set/.*/items`)
      )
    })

    it("maps the items into an array of hashes that have the sets included", function (done) {
      this.model.set({ id: "foobar" })
      this.model.fetchSetItems({
        success(setItems) {
          for (let { set, items } of Array.from(setItems)) {
            set.get("name").should.equal("A Lovely Set")
            items.first().get("title").should.equal("A Lovely Featured Link")
          }
          return done()
        },
      })
      Backbone.sync.args[0][2].success([
        fabricate("set", { name: "A Lovely Set", display_on_martsy: true }),
      ])
      return Backbone.sync.args[1][2].success([
        fabricate("featured_link", {
          title: "A Lovely Featured Link",
          display_on_martsy: true,
        }),
      ])
    })

    return it("passes a large size to accomodate large sets", function () {
      this.model.set({ id: "foobar" })
      this.model.fetchSetItems()
      Backbone.sync.args[0][2].success([
        fabricate("set", { name: "A Lovely Set", display_on_martsy: true }),
      ])
      return Backbone.sync.args[1][2].data.size.should.equal(50)
    })
  })
})
