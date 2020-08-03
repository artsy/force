/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const CurrentUser = require("../../models/current_user")
const ArtworkCollections = require("../../collections/artwork_collections")
const Artwork = require("../../models/artwork")
const { fabricate } = require("@artsy/antigravity")

describe("ArtworkCollections", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.user = new CurrentUser(fabricate("user"))
    return (this.collections = new ArtworkCollections([], { user: this.user }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#initialize", function () {
    it("sets the artworks and url when adding a collection", function () {
      this.collections.add({ id: "saved-artwork" })
      this.collections
        .first()
        .url()
        .should.containEql(
          "/api/v1/collection/saved-artwork?user_id=" + this.user.id
        )
      return this.collections
        .first()
        .artworks.url.should.containEql(
          "/api/v1/collection/saved-artwork/artworks"
        )
    })

    it("triggers {event}:artwork when a collection artwork is acted on", function () {
      return (() => {
        const result = []
        for (let e of ["destroy", "remove", "add"]) {
          let spy
          this.collections.on(e + ":artwork", (spy = sinon.spy()))
          this.collections.add({ id: "saved-artwork" })
          this.collections.first().artworks.add(fabricate("artwork"))
          this.collections.first().artworks.first().destroy()
          result.push(spy.called.should.be.ok())
        }
        return result
      })()
    })

    return it("fetches artworks by recently saved", function () {
      this.collections.add({ id: "saved-artwork" })
      return this.collections
        .first()
        .artworks.url.should.containEql("sort=-position")
    })
  })

  describe("#saveArtwork", function () {
    it("saves the artwork to the collection", function () {
      this.collections.add({ id: "saved-artwork" })
      this.collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      return Backbone.sync.args[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo-bar?user_id=" +
          this.user.id
      )
    })

    it("adds the artwork to the collections artworks", function () {
      this.collections.add({ id: "saved-artwork" })
      this.collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      return this.collections
        .first()
        .artworks.first()
        .get("id")
        .should.equal("foo-bar")
    })

    return it("adds the artwork at the beginning", function () {
      this.collections.add({ id: "saved-artwork" })
      this.collections
        .first()
        .artworks.reset([
          fabricate("artwork"),
          fabricate("artwork"),
          fabricate("artwork"),
        ])
      this.collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      return this.collections
        .first()
        .artworks.first()
        .get("id")
        .should.equal("foo-bar")
    })
  })

  describe("comparator", () =>
    it("orders the saved-artwork first", function () {
      this.collections.reset([
        { id: "foo" },
        { id: "bar" },
        { id: "saved-artwork" },
        { id: "baz" },
      ])
      return this.collections.first().get("id").should.equal("saved-artwork")
    }))

  describe("#fetchNextArtworksPage", function () {
    it("spawns out fetches for each collections artworks", function (done) {
      this.collections.reset([{ id: "saved-artwork" }, { id: "cat-portraits" }])
      this.collections.fetchNextArtworksPage({
        success(artworks) {
          _.pluck(artworks, "id").join("").should.equal("foobar")
          return done()
        },
      })
      Backbone.sync.args[0][2].success([fabricate("artwork", { id: "foo" })])
      Backbone.sync.args[0][2].complete()
      Backbone.sync.args[1][2].success([fabricate("artwork", { id: "bar" })])
      return Backbone.sync.args[1][2].complete()
    })

    return it("triggers end event when theres no more pages", function (done) {
      this.collections.reset([{ id: "saved-artwork" }, { id: "cat-portraits" }])
      this.collections.on("end:artworks", done)
      this.collections.fetchNextArtworksPage()
      Backbone.sync.args[0][2].success([])
      Backbone.sync.args[0][2].complete()
      Backbone.sync.args[1][2].success([])
      return Backbone.sync.args[1][2].complete()
    })
  })

  describe("#get", () =>
    it("changes saved-artwork to My Favorite Works", function () {
      this.collections.add({ id: "saved-artwork", name: "Saved Artwork" })
      return this.collections
        .first()
        .get("name")
        .should.equal("My Favorite Works")
    }))

  describe("#injectArtwork", () =>
    it("checks where an artwork exists and injects it into the collections", function () {
      this.collections.reset([
        { id: "foos-for-my-bar" },
        { id: "saved-artwork" },
      ])
      this.collections.injectArtwork(
        new Backbone.Model(fabricate("artwork", { id: "andy-foobar-skull" })),
        {}
      )
      _.last(Backbone.sync.args)[2].success([{ id: "foos-for-my-bar" }])
      return (
        this.collections
          .get("foos-for-my-bar")
          .artworks.get("andy-foobar-skull") != null
      ).should.be.ok()
    }))

  describe("#public", () =>
    it("checks wheter all collections are public/private"))

  return describe("#togglePrivacy", () =>
    it("toggles every collections privacy setting"))
})
