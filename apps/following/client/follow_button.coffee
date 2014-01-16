_         = require 'underscore'
Backbone  = require 'backbone'
mediator  = require '../../../lib/mediator.coffee'
analytics = require('../../../lib/analytics.coffee')

module.exports = class FollowButton extends Backbone.View

  initialize: (options) ->
    return unless options.followItemCollection

    { @followItemCollection } = options
    @modelId = @model.get('id')
    @modelName = (@model.constructor?.name or "item").toLowerCase

    # Listen to follow/unfollow events for its model
    @listenTo @followItemCollection, "add:#{@modelId}", @onFollowChange
    @listenTo @followItemCollection, "remove:#{@modelId}", @onFollowChange

    @onFollowChange()
    _.delay (=> @followItemCollection.syncFollows([])), 500

  onFollowChange: ->
    console.log @followItemCollection
    state = if @followItemCollection.isFollowing @modelId then 'following' else 'follow'
    @$el.attr 'data-state', state

  events:
    'click' : 'toggleFollowItem'

  toggleFollowItem: (e) ->
    unless @followItemCollection
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to follow artists' }
      return false

    if @followItemCollection.isFollowing @modelId
      console.log "About to unfollow #{@modelId}"
      analytics.track.click @analyticsUnfollowMessage, label: analytics.modelToLabel(@model)
      @followItemCollection.unfollow @modelId,
        error: => @$el.attr('data-state', 'following')
    else
      console.log "About to follow #{@modelId}"
      analytics.track.click @analyticsFollowMessage, label: analytics.modelToLabel(@model)
      @followItemCollection.follow @modelId,
        error: => @$el.attr('data-state', 'follow')

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    false

  # Analytics
  analyticsUnfollowMessage: "Unfollowed #{@modelId} from #{@modelName} result row"
  analyticsFollowMessage: "Followed #{@modelId} from #{@modelName} result row"
