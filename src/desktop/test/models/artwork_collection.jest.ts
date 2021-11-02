import sinon from "sinon"
import Backbone from "backbone"
const Artwork = require("../../models/artwork.coffee")
const { Artworks } = require("../../collections/artworks")
const ArtworkCollection = require("../../models/artwork_collection.coffee")
const CurrentUser = require("../../models/current_user")
const benv = require("benv")
const sd = require("sharify").data
import _ from "underscore"

describe("ArtworkCollection", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeAll(done => {
    benv.setup(() => done())
  })

  afterAll(() => {
    benv.teardown()
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")

    testContext.currentUser = new CurrentUser({ email: "a@b.c", id: "user_id" })
    sd.API_URL = "http://localhost:5000/__api"
    sd.NODE_ENV = "test"
    testContext.artworkCollection = new ArtworkCollection({
      userId: testContext.currentUser.get("id"),
    })
    testContext.artworks = new Artworks()
    testContext.artworks.add([
      new Artwork({ id: "foo", title: "Foo" }),
      new Artwork({ id: "bar", title: "Bar" }),
    ])
    testContext.artworkCollection
      .get("artworks")
      .add(testContext.artworks.models)
    testContext.artworkCollection.addRepoArtworks(testContext.artworks)
  })

  afterEach(() => Backbone.sync.restore())

  describe("#saveArtwork", () => {
    it("adds artwork to the saved artworks collection", () => {
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      const len = testContext.artworkCollection.get("artworks").length
      testContext.artworkCollection.saveArtwork(artwork.get("id"))
      testContext.artworkCollection.isSaved(artwork).should.be.true()
      testContext.artworkCollection.get("artworks").length.should.equal(len + 1)
    })

    it("makes an API request to sync the action", () => {
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      testContext.artworkCollection.saveArtwork(artwork.get("id"))
      Backbone.sync.args[0][0].should.equal("create")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/baz"
      )
    })

    it("can trigger add events for a specific artwork", done => {
      let specificArtworkAddedCalls = 0
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      testContext.artworkCollection.on(
        `add:${artwork.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      testContext.artworkCollection.saveArtwork(artwork.get("id"))
      _.defer(() =>
        _.defer(function () {
          specificArtworkAddedCalls.should.equal(1)
          done()
        })
      )
    })

    it("can accept a silent option to prevent event triggers", done => {
      let artworkAddedCalls = 0
      let specificArtworkAddedCalls = 0
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      testContext.artworkCollection.on("add", () => (artworkAddedCalls += 1))
      testContext.artworkCollection.on(
        `add:${artwork.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      testContext.artworkCollection.saveArtwork(artwork.get("id"), {
        silent: true,
      })
      _.defer(() =>
        _.defer(function () {
          artworkAddedCalls.should.equal(0)
          specificArtworkAddedCalls.should.equal(0)
          done()
        })
      )
    })

    it("calls the success callback", () => {
      const successCb = sinon.stub()
      const artwork = new Artwork({ id: "baz", title: "Baz" })
      testContext.artworkCollection.saveArtwork(artwork.get("id"), {
        success: successCb,
      })
      Backbone.sync.args[0][0].should.equal("create")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/baz"
      )
      Backbone.sync.args[0][2].success({ foo: "bar" })
      successCb.called.should.be.ok()
    })
  })

  describe("#unsaveArtwork", () => {
    it("removes artwork from the saved artworks artworkCollection", () => {
      const artwork = testContext.artworkCollection.get("artworks").first()
      const len = testContext.artworkCollection.get("artworks").length
      testContext.artworkCollection.unsaveArtwork(artwork.get("id"))
      testContext.artworkCollection.isSaved(artwork).should.be.false()
      testContext.artworkCollection.get("artworks").length.should.equal(len - 1)
    })

    it("makes an API request to sync the action", () => {
      const artwork = testContext.artworkCollection.get("artworks").first()
      testContext.artworkCollection.unsaveArtwork(artwork.get("id"))
      Backbone.sync.args[0][0].should.equal("delete")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo"
      )
    })

    it("can trigger remove events for a specific artwork", done => {
      let specificArtworkRemovedCalls = 0
      const artwork = testContext.artworkCollection.get("artworks").first()
      testContext.artworkCollection.on(
        `remove:${artwork.get("id")}`,
        () => (specificArtworkRemovedCalls += 1)
      )
      testContext.artworkCollection.unsaveArtwork(artwork.get("id"))
      setTimeout(function () {
        specificArtworkRemovedCalls.should.equal(1)
        done()
      }, 100)
    })

    it("can accept a silent option to prevent event triggers", done => {
      let artworkRemovedCalls = 0
      let specificArtworkRemovedCalls = 0
      const artwork = testContext.artworkCollection.get("artworks").first()
      testContext.artworkCollection.on(
        "remove",
        () => (artworkRemovedCalls += 1)
      )
      testContext.artworkCollection.on(
        `remove:${artwork.get("id")}`,
        () => (specificArtworkRemovedCalls += 1)
      )
      testContext.artworkCollection.unsaveArtwork(artwork.get("id"), {
        silent: true,
      })
      setTimeout(function () {
        artworkRemovedCalls.should.equal(0)
        specificArtworkRemovedCalls.should.equal(0)
        done()
      }, 100)
    })

    it("calls the success callback", () => {
      const successCb = sinon.stub()
      const artwork = testContext.artworkCollection.get("artworks").first()
      testContext.artworkCollection.unsaveArtwork(artwork.get("id"), {
        success: successCb,
      })
      Backbone.sync.args[0][0].should.equal("delete")
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo"
      )
      Backbone.sync.args[0][2].success({ foo: "bar" })
      successCb.called.should.be.ok()
    })
  })

  describe("isSaved", () => {
    it("determines if an artwork is in the user's saved artworks artworkCollection", () => {
      const unsavedArtwork = new Artwork({ id: "baz", title: "Baz" })
      const savedArtwork = testContext.artworkCollection.get("artworks").first()
      testContext.artworkCollection.isSaved(unsavedArtwork).should.be.false()
      testContext.artworkCollection.isSaved(savedArtwork).should.be.true()
    })
  })

  describe("#broadcastSaved", () => {
    it("triggers an artwork specific add for all artworks in the artworkCollection", done => {
      let specificArtworkAddedCalls = 0
      const a1 = testContext.artworkCollection.get("artworks").at(0)
      const a2 = testContext.artworkCollection.get("artworks").at(1)
      testContext.artworkCollection.on(
        `add:${a1.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      testContext.artworkCollection.on(
        `add:${a2.get("id")}`,
        () => (specificArtworkAddedCalls += 1)
      )
      testContext.artworkCollection.broadcastSaved()
      setTimeout(function () {
        specificArtworkAddedCalls.should.equal(2)
        done()
      }, 100)
    })
  })

  describe("#artworkIdsToSync", () => {
    it("returns all artwork ids that need a server check to determine if saved", () => {
      testContext.artworkCollection.addRepoArtworks(
        new Artworks([
          new Artwork({ id: "moo", title: "Moo" }),
          new Artwork({ id: "gar", title: "Gar" }),
        ])
      )
      testContext.artworkCollection.artworkIdsToSync()[0].should.equal("moo")
      testContext.artworkCollection.artworkIdsToSync()[1].should.equal("gar")

      testContext.artworkCollection
        .get("artworks")
        .add(new Artwork({ id: "moo", title: "Moo" }))
      testContext.artworkCollection.artworkIdsToSync()[0].should.equal("gar")
      testContext.artworkCollection.artworkIdsToSync().length.should.equal(1)
    })
  })

  describe("#syncSavedArtworks", () => {
    it.skip("requests the difference between this artworkCollection and the application artworks repository to determine what's saved", function () {
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
      // @ts-ignore
      server.respondWith(
        "GET",
        `${url}?artworks[]=moo&artworks[]=boo&artworks[]=gar`,
        response
      )
      this.artworkCollection.syncSavedArtworks()
      // @ts-ignore
      server.respond()
      this.artworkCollection.get("artworks").get("boo").should.be.true()
      this.artworkCollection.get("artworks").get("moo").should.be.false()
    })

    it.skip("cleans up when all saves are fetched", function () {
      this.artworkCollection.syncSavedArtworks()
      this.artworkCollection.allFetched.should.be.false()

      this.artworkCollection.syncSavedArtworks()
      this.artworkCollection.allFetched.should.be.true()
      this.artworkCollection.unsavedCache.length.should.equal(0)
      this.artworkCollection.pendingRequests.length.should.equal(0)
      this.artworkCollection.completedRequests.length.should.equal(0)
    })
  })

  describe("#processRequests", () => {
    it.skip("makes multiple requests determined by @requestSlugMax", function () {
      this.artworkCollection.artworkIdsToSync = sinon
        .stub()
        .returns(["moo", "foo", "bar"])
      this.artworkCollection.syncSavedArtworks()(
        (this.artworkCollection.requestSlugMax = 2)
      )
    })
  })
})
