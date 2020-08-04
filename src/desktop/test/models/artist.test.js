/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const { fabricate } = require("@artsy/antigravity")
const Artist = rewire("../../models/artist")

describe("Artist", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artist = new Artist(fabricate("artist")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#initialize", () =>
    it("sets up related artist collections", function () {
      this.artist
        .related()
        .artists.url.should.containEql("/api/v1/related/layer/main/artists")
      return this.artist
        .related()
        .contemporary.url.should.containEql(
          "/api/v1/related/layer/contemporary"
        )
    }))

  describe("#fetchRelatedArtists", () =>
    it("fetches one of its related artist collections with sensible default params", function () {
      this.artist.fetchRelatedArtists("Contemporary")
      _.last(Backbone.sync.args)[1].url.should.containEql("layer/contemporary")
      return _.last(Backbone.sync.args)[2].data.size.should.equal(5)
    }))

  describe("#fetchArtworks", function () {
    it("fetches the artists artworks and adds published=true", function () {
      this.artist.fetchArtworks()
      return _.last(Backbone.sync.args)[1].url.should.containEql(
        `artist/${this.artist.get("id")}/artworks?published=true`
      )
    })

    return it("fetches the artists artworks and adds published=true", function () {
      this.artist.fetchArtworks({ success: sinon.stub() })
      return _.last(Backbone.sync.args)[1].url.should.containEql(
        `artist/${this.artist.get("id")}/artworks?published=true`
      )
    })
  })

  describe("#displayAvailableWorks", () =>
    it("returns a string describing the number of available and reference works", function () {
      this.artist.set({
        published_artworks_count: 2,
        forsale_artworks_count: 1,
      })
      this.artist
        .displayAvailableWorks()
        .should.equal("1 available work & 1 reference work")
      this.artist.set({
        published_artworks_count: 4,
        forsale_artworks_count: 2,
      })
      this.artist
        .displayAvailableWorks()
        .should.equal("2 available works & 2 reference works")
      this.artist.set({
        published_artworks_count: 400,
        forsale_artworks_count: 125,
      })
      this.artist
        .displayAvailableWorks()
        .should.equal("125 available works & 275 reference works")
      this.artist.set({
        published_artworks_count: 2,
        forsale_artworks_count: 0,
      })
      this.artist.displayAvailableWorks().should.equal("2 reference works")
      this.artist.set({
        published_artworks_count: 2,
        forsale_artworks_count: 2,
      })
      return this.artist
        .displayAvailableWorks()
        .should.equal("2 available works")
    }))

  describe("#toJSONLD", () =>
    it("returns valid json", function () {
      const json = this.artist.toJSONLD()
      json["@context"].should.equal("http://schema.org")
      json["@type"].should.equal("Person")
      return json.name.should.equal("Pablo Picasso")
    }))

  describe("#toJSONLDShort", () =>
    it("returns valid json", function () {
      const json = this.artist.toJSONLDShort()
      json["@type"].should.equal("Person")
      json.name.should.equal("Pablo Picasso")
      return json.sameAs.should.containEql("artist/pablo-picasso")
    }))

  describe("#pageTitleArtworksCount", function () {
    it("formats count correctly for various artworks sizes", function () {
      this.artist.set({ published_artworks_count: 1001 })
      this.artist.pageTitleArtworksCount().should.equal("1001 Artworks")

      this.artist.set({ published_artworks_count: 101 })
      this.artist.pageTitleArtworksCount().should.equal("101 Artworks")

      this.artist.set({ published_artworks_count: 2 })
      this.artist.pageTitleArtworksCount().should.equal("2 Artworks")

      this.artist.set({ published_artworks_count: 1 })
      this.artist.pageTitleArtworksCount().should.equal("Artworks")

      this.artist.set({ published_artworks_count: 0 })
      this.artist.pageTitleArtworksCount().should.equal("Artworks")

      this.artist.set({ published_artworks_count: undefined })
      return this.artist.pageTitleArtworksCount().should.equal("Artworks")
    })

    return it("supports a threshold", function () {
      this.artist.set({ published_artworks_count: 2 })
      this.artist.pageTitleArtworksCount(2).should.equal("Artworks")

      this.artist.set({ published_artworks_count: 3 })
      return this.artist.pageTitleArtworksCount(2).should.equal("3 Artworks")
    })
  })

  describe("#displayNationalityAndBirthdate", () =>
    it("renders the correct string", function () {
      this.artist.set({ nationality: "American", years: "born 1955" })
      this.artist
        .displayNationalityAndBirthdate()
        .should.equal("American, born 1955")
      this.artist.unset("nationality")
      this.artist.displayNationalityAndBirthdate().should.equal("born 1955")
      this.artist.unset("years")
      return this.artist.displayNationalityAndBirthdate().should.be.empty
    }))

  describe("#displayFollowers", () =>
    it("renders the correct string", function () {
      this.artist.set("follow_count", 1)
      this.artist.displayFollowers().should.equal("1 Follower")
      this.artist.set("follow_count", 1000)
      this.artist.displayFollowers().should.equal("1,000 Followers")
      this.artist.unset("follow_count")
      return _.isUndefined(this.artist.displayFollowers()).should.be.true()
    }))

  describe("#toAuctionResultsPageTitle", () =>
    it("renders the correct string", function () {
      this.artist.set({ id: "sigmar-polke", name: "Sigmar Polke" })
      this.artist
        .toAuctionResultsPageTitle()
        .should.equal("Auction Results for Sigmar Polke on Artsy")
      this.artist.set({ id: "wolfgang-tillmans", name: "Wolfgang Tillmans" })
      this.artist
        .toAuctionResultsPageTitle()
        .should.equal("Auction Results for Wolfgang Tillmans on Artsy")
      this.artist.set({ id: "damon-zucconi", name: "Damon Zucconi" })
      return this.artist
        .toAuctionResultsPageTitle()
        .should.equal("Auction Results for Damon Zucconi on Artsy")
    }))

  return describe("#alternateNames", () =>
    it("concatenates alternate names into a string", function () {
      this.artist.alternateNames().should.equal("")
      this.artistWithAlternateNames = new Artist(
        fabricate("artist", {
          alternate_names: ["Paul Picasso", "Paulie Picasso"],
        })
      )
      return this.artistWithAlternateNames
        .alternateNames()
        .should.equal("Paul Picasso; Paulie Picasso")
    }))
})
