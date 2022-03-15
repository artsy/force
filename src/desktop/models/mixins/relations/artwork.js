/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { API_URL } = require("sharify").data

export const ArtworkRelations = {
  related() {
    if (this.__related__ != null) {
      return this.__related__
    }

    const { Artist } = require("../../artist")
    const {
      AdditionalImages,
    } = require("../../../collections/additional_images")
    const { Partner } = require("../../partner")

    const { PartnerShows } = require("../../../collections/partner_shows")
    const { Artists } = require("../../../collections/artists")

    const artist = new Artist(this.get("artist"))
    const partner = new Partner(this.get("partner"))
    const images = new AdditionalImages(this.get("images"), { parse: true })
    const artists = new Artists(this.get("artists"))

    const shows = new PartnerShows()
    shows.url = `${API_URL}/api/v1/related/shows?artwork_id=${this.id}&active=true`

    return (this.__related__ = {
      artist,
      partner,
      images,
      shows,
      artists,
    })
  },
}
