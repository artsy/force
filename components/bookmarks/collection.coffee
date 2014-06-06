Backbone      = require 'backbone'
Bookmark      = require './model.coffee'
{ API_URL }   = require('sharify').data

module.exports = class Bookmarks extends Backbone.Collection
  url: "#{API_URL}/api/v1/me/bookmark/artists"

  model: Bookmark

  findByArtistId: (id) ->
    @find (bookmark) ->
      bookmark.get('artist').id is id

  createFromArtist: (artist) ->
    return if @findByArtistId(artist.id)?
    @create artist_id: artist.id, artist: artist.attributes
