_           = require 'underscore'
Backbone    = require 'backbone'
mediator    = require '../../lib/mediator.coffee'
analytics   = require '../../lib/analytics.coffee'

module.exports = class FollowButton extends Backbone.View
  events:
    'click': 'toggle'
    'touchstart': () -> @$el.removeClass "no-touch"

  initialize: (options) ->
    return unless options.following

    { @following, @notes } = options

    @listenTo @following, "add:#{@model.id}", @change
    @listenTo @following, "remove:#{@model.id}", @change

    @analyticsFollowMessage     = options.analyticsFollowMessage or @defaultAnalyticsMessage('Followed')
    @analyticsUnfollowMessage   = options.analyticsUnfollowMessage or @defaultAnalyticsMessage('Unfollowed')

    @$el.addClass "no-touch"

    @change()

  defaultAnalyticsMessage: (action) ->
    "#{action} #{@model.constructor.name.toLowerCase()} from #{window?.location.pathname}"

  change: ->
    state = if @following.isFollowing(@model.id) then 'following' else 'follow'
    @$el.attr 'data-state', state

  toggle: (e) ->
    unless @following
      mediator.trigger 'open:auth', { mode: 'register', copy: "Sign up to follow #{@model.constructor.name.toLowerCase()}s" }
      return false

    if @following.isFollowing @model.id
      @following.unfollow @model.id
      analytics.track.click @analyticsUnfollowMessage, label: analytics.modelToLabel(@model)
    else
      @following.follow @model.id, notes: (@notes or @analyticsFollowMessage)
      analytics.track.click @analyticsFollowMessage, label: analytics.modelToLabel(@model)
      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500

    false
