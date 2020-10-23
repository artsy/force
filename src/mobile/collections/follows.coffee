_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../models/current_user'

#
# Follows
# Maintains the entities followed by the current user and offers `syncFollows` to retrieve
#
module.exports = class Follows extends Backbone.Collection

  maxSyncSize: 10

  initialize: ->
    @on 'add', (model) =>
      @trigger "add:#{model.get(@type).id}"
    @on 'remove', (model) =>
      @trigger "remove:#{model.get(@type).id}"

  isFollowing: (entityId) ->
    return !_.isUndefined @findByEntityId(entityId)

  findByEntityId: (entityId) ->
    @find (model) => model.get(@type).id is entityId

  # Call this from views after one or more follows are fetched
  # to see if they are followed by the current user
  # Recursively chunks the list of ids by @maxSyncSize
  syncFollows: (entityIds) ->
    return unless CurrentUser.orNull()
    return if entityIds.length is 0
    # Fetch the first up to @maxSyncSize
    options =
      data: @formatIds entityIds
      cache: false
      remove: false
      merge: true
    @fetch options
    # Recursively fetch the rest
    @syncFollows _.rest(entityIds, @maxSyncSize)

  follow: (entityId, options={}) ->
    error = options.error
    options.error = (model, response, options) =>
      @remove model
      error arguments if error
    @add @followEntity entityId, options

  unfollow: (entityId, options={}) ->
    error = options.error
    options.error = (model, response, options) =>
      @add model
      error arguments if error
    follow = @find (model) =>
      model.get(@type).id is entityId
    follow?.destroy options
    @remove follow
