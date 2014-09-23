_ = require 'underscore'
flatCompact = _.compose _.flatten, _.compact
Backbone = require 'backbone'
Notifications = require '../../../../collections/notifications.coffee'
Artworks = require '../../../../collections/artworks.coffee'

module.exports = class FeaturedArtworks extends Backbone.Collection
  limit: 4

  initialize: (models, { @user } = {}) -> #

  fetchFeatured: ->
    dfd = $.Deferred()
    @featured = new Artworks
    @featured.fetchSetItemsByKey 'homepage:featured-artworks', success: dfd.resolve, error: dfd.resolve
    dfd.promise()

  fetchPersonalized: ->
    return unless @user
    @personalized = new Notifications [], userId: @user.id, state: pageSize: @limit
    @personalized.fetch()

  takeResponse: ->
    _.take flatCompact([
      @personalized?.models
      @featured.models
    ]), @limit

  fetch: (options = {}) ->
    $.when.apply(null, _.compact([
      @fetchPersonalized()
      @fetchFeatured()
    ])).then =>
      @reset @takeResponse(), silent: true
      @trigger 'sync', this, @toJSON(), options
