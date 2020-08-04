/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artworks = require("../../collections/artworks")
const PartnerArtistArtworks = require("../../collections/partner_artist_artworks")

describe("PartnerArtistArtworks", function () {
  beforeEach(function () {
    this.artwork = fabricate("artwork")
    this.partnerArtistArtwork = {
      artwork: this.artwork,
      partner_artist: fabricate("artist"),
      position: 1,
    }
    this.artworks = new Artworks([this.artwork])
    return (this.partnerArtistArtworks = new PartnerArtistArtworks([
      this.partnerArtistArtwork,
    ]))
  })

  return describe("#serialize", () =>
    it("plucks artworks from the PartnerArtistArtwork results", function () {
      return this.partnerArtistArtworks
        .first()
        .get("artwork")
        .id.should.equal(this.artworks.first().get("id"))
    }))
})
