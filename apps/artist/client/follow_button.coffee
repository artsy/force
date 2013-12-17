_                       = require 'underscore'
Backbone                = require 'backbone'

module.exports = class FollowButton extends Backbone.View

  analyticsUnfollowMessage: "Unfollowed artist from artist result row"
  analyticsFollowMessage: "Followed artist from artist result row"

  initialize: (options) ->
    return unless options.followArtistCollection
    { @followArtistCollection } = options

    @followArtistCollection.addRepoArtist @model.get('id')

    # Listen to follow events for this work
    @listenTo @followArtistCollection, "add:#{@model.get('id')}", @onFollowArtistSaveChange
    @listenTo @followArtistCollection, "remove:#{@model.get('id')}", @onFollowArtistSaveChange
    @onFollowArtistSaveChange()
    _.delay =>
      @followArtistCollection.syncFollowedArtists()
    , 500

  onFollowArtistSaveChange: ->
    if @model.isFollowed @followArtistCollection
      @$el.removeClass('follow-button-unfollowed').addClass('follow-button-followed').text('following')
    else
      @$el.removeClass('follow-button-followed').addClass('follow-button-unfollowed').text('follow')

  events:
    'click' : 'followArtist'
    'mouseenter' : 'followingEnter'
    'mouseleave' : 'followingLeave'

  followArtist: (e) ->
    unless @followArtistCollection
      mediator.trigger 'open:auth', { mode: 'login' }
      return false

    if @model.isFollowed @followArtistCollection
      # Analytics.click @analyticsUnfollowMessage, @model
      @followArtistCollection.unfollow @model.get('id'),
        error: => @$el.removeClass('follow-button-unfollowed').addClass('follow-button-followed').text('following')
    else
      # Analytics.click @analyticsFollowMessage, @model
      @followArtistCollection.follow @model.get('id'),
        error: => @$el.removeClass('follow-button-followed').addClass('follow-button-unfollowed').text('follow')

      @$el.addClass('follow-button-clicked')
      setTimeout =>
        @$el.removeClass('follow-button-clicked')
       , 1500
    false

  followingEnter: (event) ->
    if @model.isFollowed @followArtistCollection
      @$el.text('Unfollow')

  followingLeave: (event) ->
    if @model.isFollowed @followArtistCollection
      @$el.text('Following')
