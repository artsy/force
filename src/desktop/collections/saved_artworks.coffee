Backbone = require 'backbone'
{ stringify } = require 'qs'
{ map, groupBy, toArray, without } = require 'underscore'
{ API_URL, CURRENT_USER } = require('sharify').data
SavedArtwork = require '../models/saved_artwork.coffee'

chunk = (array, size = 1) ->
  chunks = groupBy array, (x, i) -> Math.floor i / size
  toArray chunks

module.exports = class SavedArtworks extends Backbone.Collection
  model: SavedArtwork

  url: "#{API_URL}/api/v1/collection/saved-artwork/artworks"

  chunk: 20

  check: (ids) ->
    return unless CURRENT_USER?
    these = without ids, @pluck('id')...
    Promise
      .all map chunk(these, @chunk), (artworks) =>
        @fetch
          remove: false
          data: stringify {
            private: true
            size: @chunk
            user_id: CURRENT_USER.id
            artworks: artworks
          }, arrayFormat: 'brackets'

