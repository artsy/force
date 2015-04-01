_ = require 'underscore'
Artworks = require './artworks.coffee'

module.exports = class PartnerArtistArtworks extends Artworks

  parse: (response, options = {}) ->
    # This extracts the Artwork model from a PartnerArtistArtwork model
    # Consider adding a reference to the PartnerArtistArtwork position
    _.pluck response, 'artwork'
