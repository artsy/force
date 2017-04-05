_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'
Follow = require './model'

module.exports = class Following extends Backbone.Collection
  _.extend @prototype, Fetch(API_URL)

  kind: 'artist'

  maxSyncSize: 10

  url: ->
    "#{sd.API_URL}/api/v1/me/follow/#{@kind}s"

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
    @once 'sync', (a, b, jqXHR) =>
      @totalCount = jqXHR?.xhr?.getResponseHeader('X-Total-Count')

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
    options.error = _.wrap options.error, (error, model, response, options) =>
      @remove model
      error?()

    options.success = _.wrap options.success, (success, model, response, options) =>
      model.set kind: @kind
      @add model, merge: true
      success?()

    follow = new Follow null, kind: @kind

    data = _.pick options, 'notes', 'access_token', 'auto'
    data["#{@kind}_id"] = id

    # Set a nested id so it can be found optimistically
    follow.set @kind, id: id
    @add follow
    follow.save data, options

  # Optimistically remove the Follow from the Following collection
  # Augment error with inverse operation
  unfollow: (id, options = {}) ->
    options.error = _.wrap options.error, (error, model, repsponse, options) =>
      @add model
      error?()

    follow = @findByModelId id
    @remove follow
    follow?.destroy options

  followAll: (ids, options = {}) ->
    ids = [ids] unless _.isArray ids
    ids = _.map ids, (id) -> id.toLowerCase()

    options.success = _.wrap options.success, (success, model, response, options) =>
      @set _.map response, (attributes) =>
        new Follow attributes, kind: @kind
      success?()

    new Backbone.Model().save null,
      _.extend options, url: @url(), data: $.param('profile_id[]': ids, auto: true)

  # There's no bulk unfollow endpoint yet
  unfollowAll: (ids, options = {}) ->
    ids = [ids] unless _.isArray ids
    unfollows = _.map ids, (id) => @unfollow id
    @remove unfollows # Optimistically remove
    # This is only used on the client for now
    $.when.apply(null, unfollows).then(options.success, options.error)
