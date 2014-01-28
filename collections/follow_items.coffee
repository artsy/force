_             = require 'underscore'
Backbone      = require 'backbone'
CurrentUser   = require '../models/current_user.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

#
# FollowItems
#
# Abstract base class for follow item collection, e.g. FollowArtists and FollowGenes.
# This should not be created and, instead, one should create its subclass.
# Subclass that extends this must implement `getSyncFollowsData` method.
# The model of the subclass must implement `getFollowParams` and `getItem` methods.
module.exports = class FollowItems extends Backbone.Collection
  
  _.extend @prototype, Fetch(ARTSY_URL)

  initialize: (models, options) ->
    @on 'add', (model) =>
      @trigger "add:#{model.getItem().get('id')}"
    @on 'remove', (model) =>
      @trigger "remove:#{model.getItem().get('id')}"

  comparator: (item) ->
    item.getItem()?.get('name') or item.getItem()?.get('id')

  isFollowing: (itemId) ->
    (@findByItemId itemId)?

  findByItemId: (itemId) ->
    @find (m) -> m.getItem().get('id') is itemId

  syncFollows: (itemIds, options) ->
    return unless CurrentUser.orNull()
    @fetchUntilEnd _.extend
      data: @getSyncFollowsData(itemIds)
      cache: false
      remove: false
      merge: true, options

  follow: (itemId, options) ->
    followItem = @findByItemId itemId
    unless followItem?
      followItem = new @model()
      success = options?.success
      options.success = (model, response, options) =>
        @add model
        success? arguments
      followItem.save followItem.getFollowParams(itemId), options

  unfollow: (itemId, options) ->
    followItem =  @find (m) -> m.getItem().get('id') is itemId
    if followItem?
      success = options?.success
      options.success = (model, repsponse, options) =>
        @remove model
        success? arguments
      followItem.destroy options
