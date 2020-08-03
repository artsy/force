/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const should = require("should")
const Backbone = require("backbone")
const Artwork = require("../../models/artwork")
const Artworks = require("../../collections/artworks")
const ArtworkCollection = require("../../models/artwork_collection")
const CurrentUser = require("../../models/current_user")
const benv = require("benv")
const sd = require("sharify").data
const _ = require("underscore")

const { fabricate } = require("@artsy/antigravity")

describe("ArtworkCollection", function () {
  before(done => benv.setup(() => done()))

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    this.currentUser = new CurrentUser({ id: "user_id", email: "a@b.c" })
    sd.API_URL = "http://localhost:5000/__api"
    sd.NODE_ENV = "test"
    this.artworkCollection = new ArtworkCollection({
      userId: this.currentUser.get("id"),
    })
    this.artworks = new Artworks()
    this.artworks.add([
      new Artwork({ id: "foo", title: "Foo" }),
      new Artwork({ id: "bar", title: "Bar" }),
    ])
    this.artworkCollection.get("artworks").add(this.artworks.models)
    return this.artworkCollection.addRepoArtworks(this.artworks)
  })

  afterEach(() => Backbone.sync.restore())

  describe("#saveArtwork", function () {
    it("adds artwork to the saved artworks collection", function () {
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      const len = this.artworkCollection.get("artworks").length
      this.artworkCollection.saveArtwork(artwork.get("id"))
      this.artworkCollection.isSaved(artwork).should.be.true()
      return this.artworkCollection.get("artworks").length.should.equal(len + 1)
    })

    it("makes an API request to sync the action", function () {
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      this.artworkCollection.saveArtwork(artwork.get("id"))
      Backbone.sync.args[0][0].should.equal("create")
      return Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/baz"
      )
    })

    it("can trigger add events for a specific artwork", function (done) {
      let specificArtworkAddedCalls = 0
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      this.artworkCollection.on(
        `add:${artwork.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      this.artworkCollection.saveArtwork(artwork.get("id"))
      return _.defer(() =>
        _.defer(function () {
          specificArtworkAddedCalls.should.equal(1)
          return done()
        })
      )
    })

    it("can accept a silent option to prevent event triggers", function (done) {
      let artworkAddedCalls = 0
      let specificArtworkAddedCalls = 0
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      this.artworkCollection.on("add", () => (artworkAddedCalls += 1))
      this.artworkCollection.on(
        `add:${artwork.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      this.artworkCollection.saveArtwork(artwork.get("id"), { silent: true })
      return _.defer(() =>
        _.defer(function () {
          artworkAddedCalls.should.equal(0)
          specificArtworkAddedCalls.should.equal(0)
          return done()
        })
      )
    })

    return it("calls the success callback", function () {
      const successCb = sinon.stub()
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      this.artworkCollection.saveArtwork(artwork.get("id"), {
        success: successCb,
      })
      Backbone.sync.args[0][0].should.equal("create")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/baz"
      )
      Backbone.sync.args[0][2].success({ foo: "bar" })
      return successCb.called.should.be.ok()
    })
  })

  describe("#unsaveArtwork", function () {
    it("removes artwork from the saved artworks artworkCollection", function () {
      const artwork = this.artworkCollection.get("artworks").first()
      const len = this.artworkCollection.get("artworks").length
      this.artworkCollection.unsaveArtwork(artwork.get("id"))
      this.artworkCollection.isSaved(artwork).should.be.false()
      return this.artworkCollection.get("artworks").length.should.equal(len - 1)
    })

    it("makes an API request to sync the action", function () {
      const artwork = this.artworkCollection.get("artworks").first()
      this.artworkCollection.unsaveArtwork(artwork.get("id"))
      Backbone.sync.args[0][0].should.equal("delete")
      return Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo"
      )
    })

    it("can trigger remove events for a specific artwork", function (done) {
      let specificArtworkRemovedCalls = 0
      const artwork = this.artworkCollection.get("artworks").first()
      this.artworkCollection.on(
        `remove:${artwork.get("id")}`,
        () => (specificArtworkRemovedCalls += 1)
      )
      this.artworkCollection.unsaveArtwork(artwork.get("id"))
      return setTimeout(function () {
        specificArtworkRemovedCalls.should.equal(1)
        return done()
      }, 100)
    })

    it("can accept a silent option to prevent event triggers", function (done) {
      let artworkRemovedCalls = 0
      let specificArtworkRemovedCalls = 0
      const artwork = this.artworkCollection.get("artworks").first()
      this.artworkCollection.on("remove", () => (artworkRemovedCalls += 1))
      this.artworkCollection.on(
        `remove:${artwork.get("id")}`,
        () => (specificArtworkRemovedCalls += 1)
      )
      this.artworkCollection.unsaveArtwork(artwork.get("id"), { silent: true })
      return setTimeout(function () {
        artworkRemovedCalls.should.equal(0)
        specificArtworkRemovedCalls.should.equal(0)
        return done()
      }, 100)
    })

    return it("calls the success callback", function () {
      const successCb = sinon.stub()
      const artwork = this.artworkCollection.get("artworks").first()
      this.artworkCollection.unsaveArtwork(artwork.get("id"), {
        success: successCb,
      })
      Backbone.sync.args[0][0].should.equal("delete")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo"
      )
      Backbone.sync.args[0][2].success({ foo: "bar" })
      return successCb.called.should.be.ok()
    })
  })

  describe("isSaved", () =>
    it("determines if an artwork is in the user's saved artworks artworkCollection", function () {
      const unsavedArtwork = new Artwork({ id: "baz", title: "Baz" })
      const savedArtwork = this.artworkCollection.get("artworks").first()
      this.artworkCollection.isSaved(unsavedArtwork).should.be.false()
      return this.artworkCollection.isSaved(savedArtwork).should.be.true()
    }))

  describe("#broadcastSaved", () =>
    it("triggers an artwork specific add for all artworks in the artworkCollection", function (done) {
      let specificArtworkAddedCalls = 0
      const a1 = this.artworkCollection.get("artworks").at(0)
      const a2 = this.artworkCollection.get("artworks").at(1)
      this.artworkCollection.on(
        `add:${a1.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      this.artworkCollection.on(
        `add:${a2.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      this.artworkCollection.broadcastSaved()
      return setTimeout(function () {
        specificArtworkAddedCalls.should.equal(2)
        return done()
      }, 100)
    }))

  describe("#artworkIdsToSync", () =>
    it("returns all artwork ids that need a server check to determine if saved", function () {
      this.artworkCollection.addRepoArtworks(
        new Artworks([
          new Artwork({ id: "moo", title: "Moo" }),
          new Artwork({ id: "gar", title: "Gar" }),
        ])
      )
      this.artworkCollection.artworkIdsToSync()[0].should.equal("moo")
      this.artworkCollection.artworkIdsToSync()[1].should.equal("gar")

      this.artworkCollection
        .get("artworks")
        .add(new Artwork({ id: "moo", title: "Moo" }))
      this.artworkCollection.artworkIdsToSync()[0].should.equal("gar")
      return this.artworkCollection.artworkIdsToSync().length.should.equal(1)
    }))

  describe("#syncSavedArtworks", function () {
    xit("requests the difference between this artworkCollection and the application artworks repository to determine what's saved", function () {
      this.artworkCollection.addRepoArtworks(
        new Artworks([
          new Artwork({ id: "moo", title: "Moo" }),
          new Artwork({ id: "boo", title: "Boo" }),
          new Artwork({ id: "gar", title: "Gar" }),
        ])
      )
      const { url } = this.artworkCollection
      const response = [
        200,
        { "Content-Type": "application/json" },
        '{[ { "id": "boo", "title": "Boo" } ]}',
      ]
      server.respondWith(
        "GET",
        `${url}?artworks[]=moo&artworks[]=boo&artworks[]=gar`,
        response
      )
      this.artworkCollection.syncSavedArtworks()
      server.respond()
      this.artworkCollection.get("artworks").get("boo").should.be.true()
      return this.artworkCollection.get("artworks").get("moo").should.be.false()
    })

    return xit("cleans up when all saves are fetched", function () {
      this.artworkCollection.syncSavedArtworks()
      this.artworkCollection.allFetched.should.be.false()

      this.artworkCollection.syncSavedArtworks()
      this.artworkCollection.allFetched.should.be.true()
      this.artworkCollection.unsavedCache.length.should.equal(0)
      this.artworkCollection.pendingRequests.length.should.equal(0)
      return this.artworkCollection.completedRequests.length.should.equal(0)
    })
  })

  return describe("#processRequests", () =>
    xit("makes multiple requests determined by @requestSlugMax", function () {
      this.artworkCollection.artworkIdsToSync = sinon
        .stub()
        .returns(["moo", "foo", "bar"])
      this.artworkCollection.syncSavedArtworks()
      return (this.artworkCollection.requestSlugMax = 2)
    }))
})
