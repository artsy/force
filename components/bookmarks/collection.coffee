_ = require 'underscore'
Backbone = require 'backbone'
Bookmark = require './model.coffee'
{ API_URL } = require('sharify').data

module.exports = class Bookmarks extends Backbone.Collection
  url: "#{API_URL}/api/v1/me/user_interest/artists"

  model: Bookmark

  parse: (response) ->
    _.filter response, (obj) ->
      !_.isEmpty(obj.interest)

  comparator: (bookmark) ->
    -Date.parse(bookmark.get 'updated_at')

  findByInterestId: (id) ->
    @find (bookmark) ->
      bookmark.get('interest').id is id

  newFromArtist: (artist) ->
    return if @findByInterestId(artist.get('id'))?
    @unshift interest_id: artist.get('id'), interest: artist.attributes

  createFromArtist: (artist) ->
    @newFromArtist(artist)?.save()
