_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'
Follow    = require './model.coffee'

module.exports = class Following extends Backbone.Collection
  kind: 'artist'

  maxSyncSize: 10

  url: ->
    "#{sd.ARTSY_URL}/api/v1/me/follow/#{@kind}s"

  model: Follow

  parse: (response) ->
    _.map response, (obj) =>
      obj.kind = @kind; obj

  initialize: (models, options = {}) ->
    { @kind } = _.defaults(options, kind: @kind)

    @on 'add', (follow) =>
      @trigger "add:#{follow.get(@kind).id}"
    @on 'remove', (follow) =>
      @trigger "remove:#{follow.get(@kind).id}"

  isFollowing: (id) ->
    not _.isUndefined @findByModelId(id)

  findByModelId: (id) ->
    @find (follow) =>
      follow.get(@kind).id is id

  # Call this from views after one or more artists are fetched
  # to see if they are followed by the current user
  # Recursively chunks the list of ids by @maxSyncSize
  syncFollows: (ids) ->
    return unless sd.CURRENT_USER?
    return if ids.length is 0

    # Fetch the first up to @maxSyncSize
    options = merge: true, cache: false, remove: false, data: {}
    options.data["#{@kind}s"] = _.first ids, @maxSyncSize

    @fetch options

    # Recursively fetch the rest
    @syncFollows _.rest(ids, @maxSyncSize)

  # Optimistically add the Follow to the Following collection
  # Augment error with inverse operation
  follow: (id, options = {}) ->
    error = options.error
    options.error = (model, response, options) =>
      @remove model
      error(model, response, options) if error

    follow = new Follow null, kind: @kind

    data = { notes: options?.notes }
    data["#{@kind}_id"] = id

    follow.save data, options
    # Set a nested id so it can be found optimistically
    follow.set @kind, id: id

    @add follow

  # Optimistically remove the Follow from the Following collection
  # Augment error with inverse operation
  unfollow: (id, options = {}) ->
    error = options.error
    options.error = (model, repsponse, options) =>
      @add model
      error(model, repsponse, options) if error

    follow = @findByModelId id
    follow.destroy options

    @remove follow
