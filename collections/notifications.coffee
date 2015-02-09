_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artwork = require '../models/artwork.coffee'
PageableCollection = require '../components/pageable_collection/index.coffee'
{ API_URL } = require('sharify').data

module.exports = class Notifications extends PageableCollection
  model: Artwork

  url: "#{sd.API_URL}/api/v1/notifications"

  defaults:
    type: 'ArtworkPublished'
    since: 30

  state:
    pageSize: 10

  initialize: (models, options = {}) ->
    { @userId, @type, @since } = _.defaults(options, @defaults)

  fetch: (options = {}) ->
    options.data = _.defaults (options.data or {}), user_id: @userId, type: @type, since: @since
    PageableCollection::fetch.call this, options

  groupedByArtist: ->
    @groupBy (notification) ->
      notification.get('artist')?.name
