/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const Fair = require("../../models/fair")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")

describe("Fair", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.fair = new Fair(fabricate("fair")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#imageUrl", () =>
    it("returns the replaced image url", function () {
      this.fair.set({
        image_url: "foo/bar/:version.jpg",
        image_versions: ["square"],
      })
      return this.fair.imageUrl().should.equal("foo/bar/square.jpg")
    }))

  describe("#href", () =>
    it("returns a client link using the organizer profile id", function () {
      return this.fair
        .href()
        .should.equal(`/${this.fair.get("organizer").profile_id}`)
    }))

  describe("#small", () =>
    it("returns true if the fair layout is small", function () {
      return this.fair.set({ layout: "small_fair" }).small().should.be.ok()
    }))

  describe("#title", function () {
    it("if small returns organizer name", function () {
      this.fair.set({
        organizer: { name: "The Kitten Conglomerate" },
        layout: "small_fair",
      })
      return this.fair.title().should.equal("The Kitten Conglomerate")
    })

    return it("if big returns the fair name", function () {
      this.fair.set({ name: "The Pug Conglomerate", layout: "" })
      return this.fair.title().should.equal("The Pug Conglomerate")
    })
  })

  describe("#subtitle", function () {
    it("if small returns the summary", function () {
      return this.fair
        .set({
          summary: "The greatest fair with all the art!",
          layout: "small_fair",
        })
        .subtitle()
        .should.equal("The greatest fair with all the art!")
    })

    return it("returns some combinations of dates and location if big", function () {
      return this.fair
        .set({
          start_at: new Date(200, 1, 1),
          end_at: new Date(200, 1, 2),
          location: fabricate("location"),
        })
        .subtitle()
        .should.equal(
          `Feb. 1st &ndash; 2nd ${this.fair.location().cityState()}`
        )
    })
  })

  describe("#fetchSections", () =>
    it("fetches and returns sections", function (done) {
      this.fair.fetchSections({
        success(sections) {
          sections.first().get("partner_shows_count").should.equal(2)
          return done()
        },
      })
      Backbone.sync.args[0][2].url.should.match(
        new RegExp(`/api/v1/fair/.*/sections`)
      )
      return Backbone.sync.args[0][2].success([
        { section: "Focus", partner_shows_count: 2 },
      ])
    }))

  describe("#fetchShows", () =>
    it("fetches fair booths with a default size of 3 and sorted by featured", function (done) {
      this.fair.fetchShows({
        success(shows) {
          shows.first().get("name").should.equal("Many Foos at the Bars")
          return done()
        },
      })
      Backbone.sync.args[0][2].data.size.should.equal(3)
      Backbone.sync.args[0][2].data.sort.should.equal("-featured")
      return Backbone.sync.args[0][2].success({
        results: [fabricate("show", { name: "Many Foos at the Bars" })],
      })
    }))

  describe("#fetchPartners", () =>
    it("fetches the fairs partners", function () {
      this.fair.fetchPartners({
        success(partners) {
          return partners.first().get("name").should.equal("FooBar Gallery")
        },
      })
      Backbone.sync.args[0][2].success([
        fabricate("partner", { name: "FooBar Gallery" }),
      ])
      return Backbone.sync.args[0][2].success([])
    }))

  describe("#fetchArtists", () =>
    it("fetches the fairs artists", function () {
      this.fair.fetchArtists({
        success(artists) {
          return artists.first().get("name").should.equal("FooBar")
        },
      })
      Backbone.sync.args[0][1].url.should.match(new RegExp(`fair/.*/artists`))
      Backbone.sync.args[0][2].success([
        fabricate("artist", { name: "FooBar" }),
      ])
      return Backbone.sync.args[0][2].success([])
    }))

  describe("#fetchOptions", () =>
    it("fetches the fair options", function (done) {
      this.fair.fetchOptions({
        success(options) {
          if (options == null) {
            options = {}
          }
          options.get("medium").Painting.should.equal("painting")
          return done()
        },
      })
      Backbone.sync.args[0][2].url.should.match(
        new RegExp(`/api/v1/search/filtered/fair/.*/options`)
      )
      return Backbone.sync.args[0][2].success({
        medium: { Painting: "painting" },
      })
    }))

  describe("#fetchCounts", () =>
    it("fetches the counts by medium", function (done) {
      this.fair.fetchCounts({
        success(counts) {
          counts.get("medium").painting.should.equal(14)
          return done()
        },
      })
      Backbone.sync.args[0][2].url.should.match(
        new RegExp(`/api/v1/search/filtered/fair/.*/suggest`)
      )
      return Backbone.sync.args[0][2].success({ medium: { painting: 14 } })
    }))

  return describe("#fetchArtworks", () => it("fetches the fairs artworks"))
})
