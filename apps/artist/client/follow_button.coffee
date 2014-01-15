_         = require 'underscore'
Backbone  = require 'backbone'
mediator  = require '../../../lib/mediator.coffee'
analytics = require('../../../lib/analytics.coffee')

module.exports = class FollowButton extends Backbone.View
  analyticsUnfollowMessage: "Unfollowed artist from artist result row"
  analyticsFollowMessage: "Followed artist from artist result row"

  events:
    'click' : 'followArtist'

  initialize: (options) ->
    return unless options.followArtistCollection
    { @followArtistCollection, @notes } = options

    @analyticsUnfollowMessage = options.analyticsUnfollowMessage if options.analyticsUnfollowMessage
    @analyticsFollowMessage = options.analyticsFollowMessage if options.analyticsFollowMessage

    @followArtistCollection.addRepoArtist @model.get('id')

    # Listen to follow events for this work
    @listenTo @followArtistCollection, "add:#{@model.get('id')}", @onFollowArtistSaveChange
    @listenTo @followArtistCollection, "remove:#{@model.get('id')}", @onFollowArtistSaveChange
    @onFollowArtistSaveChange()
    _.delay (=> @followArtistCollection.syncFollowedArtists()), 500

  onFollowArtistSaveChange: ->
    state = if @model.isFollowed @followArtistCollection then 'following' else 'follow'
    @$el.attr 'data-state', state

  followArtist: (e) ->
    unless @followArtistCollection
      mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to follow artists' }
      return false

    if @model.isFollowed @followArtistCollection
      analytics.track.click @analyticsUnfollowMessage, label: analytics.modelToLabel(@model)
      @followArtistCollection.unfollow @model.get('id'),
        error: => @$el.attr('data-state', 'following')
    else
      analytics.track.click @analyticsFollowMessage, label: analytics.modelToLabel(@model)
      @followArtistCollection.follow @model.get('id'),
        notes: @notes
        error: => @$el.attr('data-state', 'follow')

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    false
