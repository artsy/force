/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let FillwidthView
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const CurrentUser = require("../../../models/current_user")
const Artist = require("../../../models/artist")
const { fabricate } = require("@artsy/antigravity")
const { resolve } = require("path")
const ArtistFillwidthList = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["mainTemplate", "listTemplate"]
)

ArtistFillwidthList.__set__(
  "FillwidthView",
  (FillwidthView = (function () {
    FillwidthView = class FillwidthView {
      static initClass() {
        this.prototype.render = sinon.stub()
        this.prototype.hideSecondRow = sinon.stub()
        this.prototype.removeHiddenItems = sinon.stub()
      }
    }
    FillwidthView.initClass()
    return FillwidthView
  })())
)

describe("ArtistFillwidthList", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        sd: {},
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    const artists = new Backbone.Collection([
      fabricate("artist"),
      fabricate("artist"),
    ])
    artists.model = Artist
    this.view = new ArtistFillwidthList({
      collection: artists,
      el: $("body"),
      user: new CurrentUser(fabricate("user")),
    })
    return this.view.user.initializeDefaultArtworkCollection()
  })

  afterEach(() => Backbone.sync.restore())

  describe("#initialize", () =>
    it("sets up a following collection if passed a user", function () {
      return this.view.following.kind.should.equal("artist")
    }))

  describe("#fetchAndRender", () =>
    it("renders the placeholders", function () {
      this.view.collection.reset([fabricate("artist", { name: "Andy Foobar" })])
      this.view.fetchAndRender()
      return this.view.$el.html().should.containEql("Andy Foobar")
    }))

  describe("#renderArtist", () =>
    it("fetches the artists artworks and renders a fillwidth view", function () {
      this.view.renderArtist(new Artist(fabricate("artist")))
      _.last(Backbone.sync.args)[2].success([fabricate("artwork")])
      return FillwidthView.prototype.render.called.should.be.ok()
    }))

  describe("#appendPage", () =>
    it("adds a list of artists", function () {
      this.view.appendPage([], [fabricate("artist", { name: "Andy Foobazio" })])
      return this.view.$el.html().should.containEql("Andy Foobazio")
    }))

  describe("#nextPage", () =>
    it("fetches the next page of artists", function () {
      this.view.page = 1
      this.view.nextPage()
      return _.last(Backbone.sync.args)[2].data.page.should.equal(2)
    }))

  return describe("#syncFollowsOnAjaxStop", () =>
    it("syncs follows after ajax stop", function () {
      this.view.following = { syncFollows: sinon.stub() }
      this.view.$document = $("<div>")
      this.view.syncFollowsOnAjaxStop()
      this.view.$document.trigger("ajaxStop")
      return this.view.following.syncFollows.called.should.be.ok()
    }))
})
