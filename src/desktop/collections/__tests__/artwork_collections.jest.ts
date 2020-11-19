import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
import { map } from "lodash"
const CurrentUser = require("../../../lib/current_user.coffee")
const ArtworkCollections = require("../artwork_collections.coffee")
const Artwork = require("../../models/artwork.coffee")

describe("ArtworkCollections", () => {
  let user
  let collections

  beforeEach(() => {
    Backbone.sync = jest.fn()
    user = new CurrentUser(fabricate("user"))
    collections = new ArtworkCollections([], { user: user })
  })

  describe("#initialize", () => {
    it("sets the artworks and url when adding a collection", () => {
      collections.add({ id: "saved-artwork" })
      collections
        .first()
        .url()
        .should.containEql(
          "/api/v1/collection/saved-artwork?user_id=" + user.id
        )
      collections
        .first()
        .artworks.url.should.containEql(
          "/api/v1/collection/saved-artwork/artworks"
        )
    })

    it("triggers {event}:artwork when a collection artwork is acted on", () => {
      const destroy = jest.fn()
      const remove = jest.fn()
      const add = jest.fn()
      collections.on("destroy:artwork", destroy)
      collections.on("add:artwork", add)
      collections.on("remove:artwork", remove)
      collections.add({ id: "saved-artwork" })
      collections.first().artworks.add(fabricate("artwork"))
      collections.first().artworks.first().destroy()

      expect(destroy).toBeCalled()
      expect(remove).toBeCalled()
      expect(add).toBeCalled()
    })

    it("fetches artworks by recently saved", () => {
      collections.add({ id: "saved-artwork" })
      collections.first().artworks.url.should.containEql("sort=-position")
    })
  })

  describe("#saveArtwork", () => {
    it("saves the artwork to the collection", () => {
      collections.add({ id: "saved-artwork" })
      collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      Backbone.sync.mock.calls[0][2].url.should.containEql(
        "/api/v1/collection/saved-artwork/artwork/foo-bar?user_id=" + user.id
      )
    })

    it("adds the artwork to the collections artworks", () => {
      collections.add({ id: "saved-artwork" })
      collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      collections.first().artworks.first().get("id").should.equal("foo-bar")
    })

    it("adds the artwork at the beginning", () => {
      collections.add({ id: "saved-artwork" })
      collections
        .first()
        .artworks.reset([
          fabricate("artwork"),
          fabricate("artwork"),
          fabricate("artwork"),
        ])
      collections.first().saveArtwork(new Artwork({ id: "foo-bar" }))
      collections.first().artworks.first().get("id").should.equal("foo-bar")
    })
  })

  describe("comparator", () => {
    it("orders the saved-artwork first", () => {
      collections.reset([
        { id: "foo" },
        { id: "bar" },
        { id: "saved-artwork" },
        { id: "baz" },
      ])
      collections.first().get("id").should.equal("saved-artwork")
    })
  })

  describe("#fetchNextArtworksPage", () => {
    it("spawns out fetches for each collections artworks", done => {
      collections.reset([{ id: "saved-artwork" }, { id: "cat-portraits" }])
      collections.fetchNextArtworksPage({
        success(artworks) {
          expect(map(artworks, "id").join("")).toBe("foobar")
          done()
        },
      })
      Backbone.sync.mock.calls[0][2].success([
        fabricate("artwork", { id: "foo" }),
      ])
      Backbone.sync.mock.calls[0][2].complete()
      Backbone.sync.mock.calls[1][2].success([
        fabricate("artwork", { id: "bar" }),
      ])
      Backbone.sync.mock.calls[1][2].complete()
    })

    it("triggers end event when theres no more pages", done => {
      collections.reset([{ id: "saved-artwork" }, { id: "cat-portraits" }])
      collections.on("end:artworks", done)
      collections.fetchNextArtworksPage()
      Backbone.sync.mock.calls[0][2].success([])
      Backbone.sync.mock.calls[0][2].complete()
      Backbone.sync.mock.calls[1][2].success([])
      Backbone.sync.mock.calls[1][2].complete()
    })
  })

  describe("#get", () => {
    it("changes saved-artwork to My Favorite Works", () => {
      collections.add({ id: "saved-artwork", name: "Saved Artwork" })
      collections.first().get("name").should.equal("My Favorite Works")
    })
  })

  describe("#injectArtwork", () => {
    it("checks where an artwork exists and injects it into the collections", () => {
      const success = jest.fn()
      collections.reset([{ id: "foos-for-my-bar" }, { id: "saved-artwork" }])
      collections.injectArtwork(
        new Backbone.Model(fabricate("artwork", { id: "andy-foobar-skull" })),
        { success }
      )
      Backbone.sync.mock.calls[0][2].success([{ id: "foos-for-my-bar" }])
      expect(success).toBeCalled()
      expect(
        collections.get("foos-for-my-bar").artworks.get("andy-foobar-skull")
      ).not.toBeNull()
    })
  })

  describe("#public", () => {
    it.skip("checks wheter all collections are public/private", () => {})
  })

  describe("#togglePrivacy", () => {
    it.skip("toggles every collections privacy setting", () => {})
  })
})
