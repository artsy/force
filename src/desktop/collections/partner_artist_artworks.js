/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerArtistArtworks
const _ = require("underscore")
const { Artworks } = require("./artworks")

export default _PartnerArtistArtworks = class PartnerArtistArtworks extends Artworks {
  parse(response, options) {
    // This extracts the Artwork model from a PartnerArtistArtwork model
    // Consider adding a reference to the PartnerArtistArtwork position
    if (options == null) {
      options = {}
    }
    return _.pluck(response, "artwork")
  }
}
export const PartnerArtistArtworks = _PartnerArtistArtworks
