_ = require 'underscore'
Backbone = require 'backbone'
analyticsHooks = require '../../lib/analytics_hooks'

module.exports = class FollowButtonView extends Backbone.View

  events:
    'click': 'onToggle'

  initialize: (options) ->
    @validateView options
    { @followId, @isLoggedIn, @type, @_id, @context_module, @context_page } = options
    @listenTo @collection, "add:#{@followId}", @onFollowChange
    @listenTo @collection, "remove:#{@followId}", @onFollowChange
    @onFollowChange()

  validateView: (options) ->
    throw "You need to pass a Follows collection!" unless @collection
    throw "This view's collection must implement `isFollowing`" unless _.isFunction @collection.isFollowing
    throw "This view's collection must implement `follow`" unless _.isFunction @collection.follow
    throw "This view's collection must implement `unfollow`" unless _.isFunction @collection.unfollow
    throw "You must pass an ID for a followable entity as `followId`" unless options.followId

  onFollowChange: (e) ->
    state = if @collection.isFollowing(@followId) then 'following' else 'follow'
    @$el.attr 'data-state', state

  onToggle: (e) ->
    return false if @$el.hasClass('.is-clicked')

    if @isLoggedIn
      if @collection.isFollowing @followId
        @collection.unfollow @followId
        analyticsHooks.trigger 'followable:unfollowed', {
          entity_id: @_id,
          entity_slug: @followId,
          context_module: @context_module,
          context_page: @context_page,
          entity_type: @type
        }
      else
        @collection.follow @followId
        analyticsHooks.trigger 'followable:followed', {
          entity_id: @_id,
          entity_slug: @followId,
          context_module: @context_module,
          context_page: @context_page,
          entity_type: @type
        }
        # Delay label change
        @$el.addClass 'is-clicked'
        setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    else
      analyticsHooks.trigger 'follow:login'
      location.href = "/log_in?redirect-to=#{window.location}"

    false
