_         = require 'underscore'
Backbone  = require 'backbone'
mediator  = require '../../../lib/mediator.coffee'
track     = require('../../../lib/analytics.coffee').track

module.exports = class FollowButton extends Backbone.View
  analyticsUnfollowMessage: "Unfollowed artist from artist result row"
  analyticsFollowMessage: "Followed artist from artist result row"

  events:
    'click' : 'followArtist'

  initialize: (options) ->
    return unless options.followArtistCollection
    { @followArtistCollection } = options

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
      mediator.trigger 'open:auth', { mode: 'login' }
      return false

    if @model.isFollowed @followArtistCollection
      track.click @analyticsUnfollowMessage, @model
      @followArtistCollection.unfollow @model.get('id'),
        error: => @$el.attr('data-state', 'following')
    else
      track.click @analyticsFollowMessage, @model
      @followArtistCollection.follow @model.get('id'),
        error: => @$el.attr('data-state', 'follow')

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
    false
