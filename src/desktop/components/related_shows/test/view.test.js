/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Artist = require("../../../models/artist")
const RelatedShowsView = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("RelatedShowsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.artist = new Artist(fabricate("artist"))
    this.view = new RelatedShowsView({
      model: this.artist,
      collection: this.artist.related().shows,
      nUp: 3,
    })
    return done()
  })

  afterEach(() => Backbone.sync.restore())

  describe("has a single show", function () {
    beforeEach(function (done) {
      this.show = fabricate("show", { name: "Foobar Show" })
      this.artist.related().shows.reset([this.show], { parse: true })
      this.view.collection.trigger("sync")
      return done()
    })

    return it("renders correctly", function () {
      const html = this.view.$el.html()
      html.should.containEql("grid-3-up")
      this.view.$(".fsfs-show-name").text().should.equal("Foobar Show")
      return this.view.$(".grid-item").length.should.equal(1)
    })
  })

  return describe("has multiple shows", function () {
    beforeEach(function (done) {
      this.shows = [fabricate("show"), fabricate("show"), fabricate("show")]
      this.artist.related().shows.reset(this.shows, { parse: true })
      this.view.collection.trigger("sync")
      return done()
    })

    return it("renders correctly", function () {
      return this.view.$(".grid-item").length.should.equal(3)
    })
  })
})
