/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Artworks = require("../../../collections/artworks")
const CurrentUser = require("../../../models/current_user")
const { resolve } = require("path")
const FillwidthView = benv.requireWithJadeify(resolve(__dirname, "../view"), [
  "template",
])

describe("FillwidthView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      $.fn.fillwidth = sinon.stub()
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    this.currentUser = new CurrentUser({ id: "user_id", email: "a@b.c" })
    window.currentUser = this.currentUser
    window.currentUser.initializeDefaultArtworkCollection()
    sinon.stub(Backbone, "sync")
    const col = new Artworks([fabricate("artwork")])
    col.url = "foo/bar"
    this.removed = false
    this.view = new FillwidthView({
      el: $("body"),
      collection: col,
      empty: () => {
        return (this.removed = true)
      },
    })
    return done()
  })

  afterEach(() => Backbone.sync.restore())

  describe("#render", () =>
    it("renders a row of artworks", function () {
      this.view.collection.first().set("title", "Foo to the Bar")
      this.view.render()
      return this.view.$el.html().should.containEql("Foo to the Bar")
    }))

  describe("#nextPage", () =>
    it("fetches the next page of artworks", function () {
      this.view.page = 0
      this.view.nextPage()
      _.last(Backbone.sync.args)[1].url.should.containEql("foo/bar")
      _.last(Backbone.sync.args)[2].data.page.should.equal(0)
      return this.view.page.should.equal(1)
    }))

  describe("#empty", () =>
    it("runs empty if the collection has no items in it", function () {
      this.view.collection = new Artworks()
      this.view.render()
      return this.removed.should.equal(true)
    }))

  return describe("#handleSeeMore", function () {
    xit("Hides first row")
    xit("Shows see more if got # of artowrks asked for")
    return xit(
      "Shows see more if got fewer artworks than asked but not all fit on row"
    )
  })
})
