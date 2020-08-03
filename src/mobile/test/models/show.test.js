/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const _ = require("underscore")
const Show = require("../../models/show")
const Artwork = require("../../models/artwork")
const { fabricate } = require("@artsy/antigravity")
const moment = require("moment")

describe("Show", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.show = new Show(fabricate("show")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#formattedDateRange", () =>
    it("formates the date range of the show", function () {
      this.show
        .formattedDateRange()
        .should.containEql(moment(this.show.get("start_at")).format("MMM. Do"))
      return this.show
        .formattedDateRange()
        .should.containEql(moment(this.show.get("end_at")).format("MMM. Do"))
    }))

  describe("#artworks", () =>
    it("wraps the artworks in a collection", function () {
      this.show.set({ artworks: [fabricate("artwork", { title: "Foobar" })] })
      return this.show.artworks().first().get("title").should.equal("Foobar")
    }))

  describe("#fairHref", function () {
    beforeEach(function () {
      return this.show.set({ fair: fabricate("fair") })
    })

    it("returns an href to the fair", function () {
      return this.show
        .fairHref()
        .should.equal(`/${this.show.get("fair").organizer.profile_id}`)
    })

    it("returns nothing if there is no default_profile_id", function () {
      delete this.show.attributes.fair.default_profile_id
      return _.isUndefined(this.show.fairHref()).should.be.true()
    })

    return it("returns nothing if there is no fair", function () {
      delete this.show.set("fair", null)
      return _.isUndefined(this.show.fairHref()).should.be.true()
    })
  })

  describe("#feedHeader", function () {
    it("shows the fair name if its a fair", function () {
      this.show.set({ fair: { name: "foobar" } })
      return this.show.feedHeader().should.equal("foobar")
    })

    return it("shows the artist name if no show name and no fair", function () {
      this.show.set({
        artists: [
          fabricate("artist", { name: "foo" }),
          fabricate("artist", { name: "bar" }),
        ],
        name: "",
      })
      return this.show.feedHeader().should.equal("foo, bar")
    })
  })

  describe("#feedSubheaderAppend", function () {
    it("shows the fair location if a fair booth", function () {
      this.show.set({ fair: {}, fair_location: { display: "foo at the bar" } })
      return this.show.feedSubheaderAppend().should.equal("foo at the bar")
    })

    return it("shows the location city if not at a fair", function () {
      this.show.set({ location: { city: "Cincinnati" }, fair: null })
      return this.show.feedSubheaderAppend().should.equal("Cincinnati")
    })
  })

  describe("#formattedLocation", function () {
    it("gives the fair location if its a fair booth", function () {
      const fairLocation = "Pier 94 - Contemporary, Booth 833"
      this.show.set({ fair: fabricate("fair", { name: "The Foobar Show" }) })
      this.show.set("fair_location", { display: fairLocation })
      return this.show.formattedLocation().should.equal(fairLocation)
    })

    return it("gives the city and address if not a fair", function () {
      this.show.set({
        location: { city: "Cincinnati", address: "Spinningwheel Ln." },
      })
      return this.show
        .formattedLocation()
        .should.equal("Cincinnati, Spinningwheel Ln.")
    })
  })

  describe("#fetchArtworks", () =>
    it("fetches the shows artworks", function (done) {
      this.show.fetchArtworks({
        success(artworks) {
          artworks.first().get("title").should.equal("FooBarBaz")
          return done()
        },
      })
      Backbone.sync.args[0][2].url.should.containEql(
        `show/${this.show.get("id")}/artworks`
      )
      return Backbone.sync.args[0][2].success([
        fabricate("artwork", { title: "FooBarBaz" }),
      ])
    }))

  describe("#hasImageUrl", () =>
    it("returns false if the image is empty", function () {
      this.show.set({ artowrks: undefined, image_url: "", image_versions: [] })
      return this.show.hasImageUrl().should.be.false()
    }))

  describe("#imageUrl", function () {
    it("is medium by default", function () {
      return this.show
        .set({ image_url: "foo/:version/bar" })
        .imageUrl()
        .should.equal("foo/medium/bar")
    })

    it("works if has no artworks", function () {
      this.show.set({ artworks: undefined, image_url: "", image_versions: [] })
      return this.show.imageUrl().should.equal("")
    })

    return it("falls back to an artwork if available", function () {
      const artwork = fabricate("artwork")
      const artworkModel = new Artwork(artwork)
      this.show.set({ image_url: "", image_versions: [], artworks: [artwork] })
      return this.show.imageUrl().should.equal(artworkModel.defaultImageUrl())
    })
  })

  return describe("#posterImage", function () {
    it("returns featured if it exists", function () {
      return this.show
        .set({
          image_versions: ["featured", "larger"],
          image_url: "cat/bitty/:version",
        })
        .posterImage()
        .should.equal("cat/bitty/featured")
    })

    return it("returns larger if it exists", function () {
      return this.show
        .set({
          image_versions: ["large", "larger"],
          image_url: "cat/bitty/:version",
        })
        .posterImage()
        .should.equal("cat/bitty/larger")
    })
  })
})
