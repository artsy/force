_ = require 'underscore'
Backbone = require 'backbone'
Bookmark = require './model.coffee'
{ API_URL } = require('sharify').data

module.exports = class Bookmarks extends Backbone.Collection
  url: "#{API_URL}/api/v1/me/bookmark/artists"

  model: Bookmark

  parse: (response) ->
    _.filter response, (obj) ->
      !_.isEmpty(obj.artist)

  comparator: (bookmark) ->
    -Date.parse(bookmark.get 'updated_at')

  findByArtistId: (id) ->
    @find (bookmark) ->
      bookmark.get('artist').id is id

  newFromArtist: (artist) ->
    return if @findByArtistId(artist.id)?
    @unshift artist_id: artist.id, artist: artist.attributes

  createFromArtist: (artist) ->
    @newFromArtist(artist)?.save()
