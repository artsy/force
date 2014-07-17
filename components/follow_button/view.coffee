_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../lib/mediator.coffee'
analytics = require '../../lib/analytics.coffee'

module.exports = class FollowButton extends Backbone.View
  events:
    'click': 'toggle'
    'touchstart': () -> @$el.removeClass "no-touch"

  initialize: (options) ->
    { @following, @notes, @modelName } = options

    return unless @following

    throw new Error('Requires @modelName') unless @modelName

    @listenTo @following, "add:#{@model.id}", @change
    @listenTo @following, "remove:#{@model.id}", @change

    @analyticsFollowMessage = options.analyticsFollowMessage or @defaultAnalyticsMessage('Followed')
    @analyticsUnfollowMessage = options.analyticsUnfollowMessage or @defaultAnalyticsMessage('Unfollowed')

    @$el.addClass "no-touch"

    @change()

  defaultAnalyticsMessage: (action) ->
    "#{action} #{@modelName} from #{window?.location.pathname}"

  change: ->
    state = if @following.isFollowing(@model.id) then 'following' else 'follow'
    @$el.attr 'data-state', state

  toggle: (e) ->
    @trigger 'click'

    unless @following
      analytics.track.funnel 'Triggered sign up form via follow button'
      mediator.trigger 'open:auth',
        mode: 'register'
        copy: "Sign up to follow #{@modelName}s"
        destination: "#{@model.href()}/follow"
      return false

    if @following.isFollowing @model.id
      @following.unfollow @model.id
      mediator.trigger 'follow-button:unfollow', @$el, @model
      analytics.track.click @analyticsUnfollowMessage, label: analytics.modelNameAndIdToLabel(@modelName, @model.id)
    else
      @following.follow @model.id, notes: (@notes or @analyticsFollowMessage)
      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
      mediator.trigger 'follow-button:follow', @$el, @model
      analytics.track.click @analyticsFollowMessage, label: analytics.modelNameAndIdToLabel(@modelName, @model.id)

    false
