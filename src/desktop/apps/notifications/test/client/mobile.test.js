/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Q = require("bluebird-q")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Notifications = require("../../../../collections/notifications.coffee")
const Artworks = require("../../../../collections/artworks.coffee")
const Artist = require("../../../../models/artist.coffee")
const NotificationsView = benv.requireWithJadeify(
  require.resolve("../../client/mobile"),
  ["template", "artworkColumnsTemplate", "emptyTemplate"]
)

xdescribe("NotificationsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      $.onInfiniteScroll = sinon.stub()
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(() => sinon.stub(Backbone, "sync").returns(Q.resolve()))

  afterEach(() => Backbone.sync.restore())

  describe("without artist_id", function () {
    beforeEach(function (done) {
      return benv.render(
        require.resolve("../../templates/mobile/index.jade"),
        { sd: {} },
        () => {
          this.view = new NotificationsView({ el: $("body") })
          return done()
        }
      )
    })

    it("makes the right API call", function () {
      _.last(Backbone.sync.args)[2].url.should.containEql(
        "/api/v1/me/notifications"
      )
      return _.last(Backbone.sync.args)[2].data.page.should.equal(1)
    })

    it("groups and renders properly", function () {
      const bittyArtwork1 = fabricate("artwork", {
        published_changed_at: "2012-05-07T04:00:00+00:00",
        artist: fabricate("artist", { id: "bitty", name: "Bitty Z" }),
      })
      const bittyArtwork2 = fabricate("artwork", {
        published_changed_at: "2012-05-07T04:00:00+00:00",
        artist: fabricate("artist", { id: "bitty", name: "Bitty Z" }),
      })
      const percyArtwork1 = fabricate("artwork", {
        published_changed_at: "2012-05-06T04:00:00+00:00",
        artist: fabricate("artist", { id: "percy", name: "Percy Z" }),
      })
      _.last(Backbone.sync.args)[2].success([
        bittyArtwork1,
        bittyArtwork2,
        percyArtwork1,
      ])
      this.view.$el.find(".notifications-list-item").length.should.equal(2) // One for Bitty, One for Percy
      this.view.$el.html().should.containEql("Bitty Z")
      this.view.$el.html().should.containEql("Percy Z")
      this.view.$el.html().should.containEql("/artist/bitty")
      this.view.$el.html().should.containEql("/artist/percy")
      this.view.$el.html().should.containEql("2 works added")
      return this.view.$el.html().should.containEql("1 work added")
    })

    return describe("no notifications", () =>
      it("renders the empty notice", function () {
        _.last(Backbone.sync.args)[2].success([])
        return this.view.$el.html().should.containEql("Nothing here yet")
      }))
  })

  return describe("with artist_id", function () {
    beforeEach(function (done) {
      return benv.render(
        require.resolve("../../templates/mobile/index.jade"),
        { sd: {} },
        () => {
          sinon
            .stub(NotificationsView.prototype, "params")
            .returns({ artist_id: "emile-ajar" })
          this.view = new NotificationsView({ el: $("body") })
          return done()
        }
      )
    })

    afterEach(function () {
      return this.view.params.restore()
    })

    it("makes the right API calls", () =>
      Backbone.sync.args[0][1].url.should.containEql(
        "api/v1/artist/emile-ajar/artworks"
      ))

    return it("groups and renders properly", function () {
      Backbone.sync.args[0][2].success([
        fabricate("artwork", {
          id: "emile-ajar-artwork",
          artist: { name: "Émile Ajar" },
        }),
      ])

      this.view.$el.html().should.containEql("Émile Ajar")
      this.view.$el.html().should.containEql("emile-ajar-artwork")

      const bittyArtwork1 = fabricate("artwork", {
        published_changed_at: "2012-05-07T04:00:00+00:00",
        artist: fabricate("artist", { id: "bitty", name: "Bitty Z" }),
      })
      const bittyArtwork2 = fabricate("artwork", {
        published_changed_at: "2012-05-07T04:00:00+00:00",
        artist: fabricate("artist", { id: "bitty", name: "Bitty Z" }),
      })
      const percyArtwork1 = fabricate("artwork", {
        published_changed_at: "2012-05-06T04:00:00+00:00",
        artist: fabricate("artist", { id: "percy", name: "Percy Z" }),
      })
      _.last(Backbone.sync.args)[2].success([
        bittyArtwork1,
        bittyArtwork2,
        percyArtwork1,
      ])
      this.view.$el.find(".notifications-list-item").length.should.equal(3) // One for Émile, Bitty, One for Percy
      this.view.$el.html().should.containEql("Bitty Z")
      this.view.$el.html().should.containEql("Percy Z")
      this.view.$el.html().should.containEql("/artist/bitty")
      this.view.$el.html().should.containEql("/artist/percy")
      this.view.$el.html().should.containEql("2 works added")
      return this.view.$el.html().should.containEql("1 work added")
    })
  })
})
