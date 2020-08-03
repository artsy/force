/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const QuasiInfiniteView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])

class ViewFromQuasiInfiniteView extends QuasiInfiniteView {
  static initClass() {
    this.prototype.kind = "tests"
  }

  initialize() {
    this.params = new Backbone.Model({ page: 1 })
    this.collection = new Backbone.Collection()
    return super.initialize(...arguments)
  }
}
ViewFromQuasiInfiniteView.initClass()

describe("QuasiInfiniteView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    if (!$.waypoints) {
      $.waypoints = function () {}
    } //
    if (!$.fn.waypoint) {
      $.fn.waypoint = function () {}
    } //
    sinon.stub($, "waypoints")
    sinon.stub($.fn, "waypoint")

    return (this.view = new ViewFromQuasiInfiniteView())
  })

  afterEach(function () {
    Backbone.sync.restore()

    $.waypoints.restore()
    return $.fn.waypoint.restore()
  })

  describe("#render", () =>
    it("renders the template", function () {
      return this.view.render().$el.html().should.containEql("Nothing yet.")
    }))

  describe("#updateCounts", function () {
    it("returns the correct `total` and `remaining` when the collection is empty", function () {
      return this.view.updateCounts().should.eql({
        total: 0,
        remaining: 0,
      })
    })

    return it("returns the correct `total` and `remaining` when the collection is fetched and returns a response", function () {
      this.view.collection.totalCount = 5
      Backbone.sync
        .onCall(0)
        .yieldsTo("success", [{ id: "foo" }, { id: "bar" }])
        .returns(Promise.resolve())
        .onCall(1)
        .yieldsTo("success", [{ id: "baz" }])
        .returns(Promise.resolve())

      return this.view
        .fetch()
        .then(() => {
          this.view.updateCounts().should.eql({
            total: 5,
            remaining: 3,
          })
          return this.view.fetch()
        })
        .then(() => {
          return this.view.updateCounts().should.eql({
            total: 5,
            remaining: 2,
          })
        })
    })
  })

  describe("#detectEnd", () =>
    it('removes the "More (n)" button when there is 0 remaining', function () {
      this.view.collection.totalCount = 2
      Backbone.sync
        .onCall(0)
        .yieldsTo("success", [{ id: "foo" }])
        .returns(Promise.resolve())
        .onCall(1)
        .yieldsTo("success", [{ id: "bar" }])
        .returns(Promise.resolve())

      return this.view
        .fetch()
        .then(() => {
          this.view.$el.html().should.containEql("2 tests")
          this.view.$(this.view.selectors.more).should.have.lengthOf(1)
          this.view.$(this.view.selectors.more).text().should.equal("More (1)")
          return this.view.fetch()
        })
        .then(() => {
          return this.view.$(this.view.selectors.more).should.have.lengthOf(0)
        })
    }))

  return describe("#tripInfinite", () =>
    it("initializes the infinite scrolling mode on the 2nd page (once)", function () {
      Backbone.sync.yieldsTo("success", [])

      this.view.params.get("page").should.equal(1)

      Backbone.sync.callCount.should.equal(0)
      this.view.$el.waypoint.callCount.should.equal(0)

      this.view.nextPage()
      this.view.params.get("page").should.equal(2)

      Backbone.sync.callCount.should.equal(1)
      this.view.$el.waypoint.callCount.should.equal(1)

      this.view.nextPage()

      Backbone.sync.callCount.should.equal(2)
      return this.view.$el.waypoint.callCount.should.equal(1)
    }))
})
