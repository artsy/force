_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artwork = require '../models/artwork.coffee'
PageableCollection = require 'backbone-pageable'
{ API_URL } = require('sharify').data

module.exports = class Notifications extends PageableCollection
  model: Artwork

  url: "#{sd.API_URL}/api/v1/me/notifications"

  defaults:
    type: 'ArtworkPublished'
    since: 30

  state:
    pageSize: 10

  queryParams:
    pageSize: 'size'

  initialize: (models, options = {}) ->
    { @userId, @type, @since } = _.defaults(options, @defaults)

  fetch: (options = {}) ->
    options.data = user_id: @userId, type: @type, since: @since
    super
