_              = require 'underscore'
Backbone       = require 'backbone'
mediator       = require '../../lib/mediator.coffee'
analytics      = require '../../lib/analytics.coffee'
FollowProfiles = require '../../collections/follow_profiles.coffee'

module.exports = class FollowProfileButton extends Backbone.View

  analyticsFollowMessage:   'Followed partner profile from /partners'

  analyticsUnfollowMessage: 'Unfollowed partner profile from /partners'

  events:
    'click' : 'onFollowClick'

  initialize: (options) ->
    return unless @collection

    @analyticsUnfollowMessage   = options.analyticsUnfollowMessage || @analyticsUnfollowMessage
    @analyticsFollowMessage     = options.analyticsFollowMessage || @analyticsFollowMessage

    @listenTo @collection, "add:#{@model.get('id')}", @onFollowChange
    @listenTo @collection, "remove:#{@model.get('id')}", @onFollowChange

  onFollowChange: ->
    state = if @collection.isFollowing @model then 'following' else 'follow'
    @$el.attr 'data-state', state

  onFollowClick: (e) ->
    unless @collection
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to follow galleries and museums' }
      return false

    if @collection.isFollowing @model
      analytics.track.click @analyticsUnfollowMessage, label: analytics.modelToLabel(@model)
      @collection.unfollow @model.get('id')
    else
      analytics.track.click @analyticsFollowMessage, label: analytics.modelToLabel(@model)
      @collection.follow @model.get('id')

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    false