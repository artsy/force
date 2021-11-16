import { fabricate } from "@artsy/antigravity"
const { Artworks } = require("../artworks")
const { PartnerArtistArtworks } = require("../partner_artist_artworks")

describe("PartnerArtistArtworks", () => {
  let artworks
  let partnerArtistArtworks

  beforeEach(() => {
    const artwork = fabricate("artwork")
    const partnerArtistArtwork = {
      artwork: artwork,
      partner_artist: fabricate("artist"),
      position: 1,
    }
    artworks = new Artworks([artwork])
    partnerArtistArtworks = new PartnerArtistArtworks([partnerArtistArtwork])
  })

  describe("#serialize", () => {
    it("plucks artworks from the PartnerArtistArtwork results", () => {
      partnerArtistArtworks
        .first()
        .get("artwork")
        .id.should.equal(artworks.first().get("id"))
    })
  })
})
