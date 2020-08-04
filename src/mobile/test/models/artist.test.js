/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const Artist = require("../../models/artist")
const { fabricate } = require("@artsy/antigravity")

describe("Artist", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artist = new Artist(fabricate("artist")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#imageUrl", () =>
    it("returns the replaced image url", function () {
      this.artist.set({ image_url: "foo/bar/:version.jpg" })
      return this.artist.imageUrl().should.equal("foo/bar/medium.jpg")
    }))

  describe("#maybeFetchAndSetFeaturedBio", function () {
    it("calls the callback and doesnt change the blurb if there is a blurb", function () {
      this.artist.set({ blurb: "original blurb" })
      const cb = sinon.stub()
      this.artist.maybeFetchAndSetFeaturedBio(cb)
      Backbone.sync.args.length.should.equal(0)
      this.artist.get("blurb").should.equal("original blurb")
      return cb.called.should.be.ok()
    })

    return it("sets the featured partner bio and calls the callback if there is no blurb", function () {
      this.artist.unset("blurb")
      const cb = sinon.stub()
      this.artist.maybeFetchAndSetFeaturedBio(cb)
      Backbone.sync.args[0][2].success([{ biography: "featured blurb" }])
      Backbone.sync.args[0][1].url.should.containEql(
        "partner_artists?size=1&featured=true"
      )
      cb.called.should.be.ok()
      return this.artist.get("blurb").should.equal("featured blurb")
    })
  })

  describe("#fetchArtworks", () =>
    it("fetches the artists artworks", function (done) {
      this.artist.fetchArtworks({
        success(artworks) {
          artworks.first().get("title").should.equal("Arrghwork")
          return done()
        },
      })
      Backbone.sync.args[0][2].success([
        fabricate("artwork", { title: "Arrghwork" }),
      ])
      return Backbone.sync.args[0][1].url.should.match(
        new RegExp(`/api/v1/artist/.*/artworks`)
      )
    }))

  describe("#fetchRelatedArtists", () =>
    it("fetches the related artists", function (done) {
      this.artist.fetchRelatedArtists({
        success(artists) {
          artists.first().get("name").should.equal("Andy Bazqux")
          return done()
        },
      })
      Backbone.sync.args[0][2].success([
        fabricate("artist", { name: "Andy Bazqux" }),
      ])
      return Backbone.sync.args[0][1].url.should.containEql(
        "layer/main/artists"
      )
    }))

  describe("#defaultImageUrl", function () {
    it("defaults to tall if the image version exists", function () {
      this.artist.set({ image_url: "cat/bitty/:version.jpg" })
      this.artist.set({ image_versions: ["tall", "other"] })
      return this.artist.defaultImageUrl().should.equal("cat/bitty/tall.jpg")
    })

    return it("falls back to four_thirds (partner artist) if tall version not present", function () {
      this.artist.set({ image_url: "cat/bitty/:version.jpg" })
      this.artist.set({ image_versions: ["four_thirds", "other"] })
      return this.artist
        .defaultImageUrl()
        .should.equal("cat/bitty/four_thirds.jpg")
    })
  })

  return describe("#fetchFilteredArtworks", () =>
    it("fetches the filtered artists artworks", function (done) {
      this.artist.fetchFilteredArtworks({
        data: { sort: "title" },
        success(artworks) {
          artworks.first().get("title").should.equal("Blahwork")
          return done()
        },
      })
      Backbone.sync.args[0][2].success({
        hits: [fabricate("artwork", { title: "Blahwork" })],
      })
      Backbone.sync.args[0][1].url.should.match(
        new RegExp(`/api/v1/filter/artworks`)
      )
      return Backbone.sync.args[0][2].data.should.equal("sort=title")
    }))
})
