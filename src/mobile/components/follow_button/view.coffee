_ = require 'underscore'
Backbone = require 'backbone'

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
        window.analytics.track("Unfollowed " + @type, {
          entity_id: @_id,
          entity_slug: @followId,
          context_module: @context_module,
          context_page: @context_page,
        })
      else
        @collection.follow @followId
        window.analytics.track("Followed " + @type, {
          entity_id: @_id,
          entity_slug: @followId,
          context_module: @context_module,
          context_page: @context_page,
        })

        # Delay label change
        @$el.addClass 'is-clicked'
        setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    else
      location.href = "/sign_up?action=follow&objectId=#{@followId}&kind=artist&destination=#{window.location}&intent=follow+#{@type.toLowerCase()}&contextModule=#{@context_module}"

    false
