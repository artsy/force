_ = require 'underscore'
Backbone = require 'backbone'
{ mediator } = require '../../../lib/mediator'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'
ArtistSuggestions = require './artist_suggestions.coffee'
{ ARTIST_PAGE_CTA_ENABLED } = require('sharify').data
{ openAuthModal } = require '../../lib/openAuthModal'
{ ModalType } = require "../../../v2/Components/Authentication/Types"
{
  Intent,
  ActionType,
  followedArtist,
  unfollowedArtist
  followedFair,
  unfollowedFair
  followedGene,
  unfollowedGene
  followedPartner,
  unfollowedPartner
} = require "@artsy/cohesion"
{ trackEvent } = require "../../analytics/helpers.ts"

module.exports = class FollowButton extends Backbone.View

  events:
    'click': 'toggle'
    'touchstart': () -> @$el.removeClass "no-touch"

  initialize: (options) ->
    {
      @following,
      @notes,
      @modelName,
      @href,
      @context_page,
      @context_module,
      @hideSuggestions
    } = options

    @label = if options.label then options.label else "#{@modelName}s"

    return unless @following

    throw new Error('Requires @modelName') unless @modelName

    @listenTo @following, "add:#{@model.id}", @change
    @listenTo @following, "remove:#{@model.id}", @change
    @$el.addClass "no-touch"

    if @modelName is 'artist' and @following and not @hideSuggestions
      @artistSuggestionsView = new ArtistSuggestions
        model: @model
        el: @$el
        following: @following
        context_page: @context_page

    @change()

  change: ->
    state = if @following.isFollowing(@model.id) then 'following' else 'follow'
    @$el.attr 'data-state', state

  getIntent: ->
    switch @modelName
      when "artist" then Intent.followArtist
      when "profile" then Intent.followPartner
      when "partner" then Intent.followPartner
      when "gene" then Intent.followGene

  toggle: (e) ->
    @trigger 'click'

    unless @following
      mediator.trigger 'clickFollowButton'
      return if ARTIST_PAGE_CTA_ENABLED
      openAuthModal(ModalType.signup, {
        copy: "Sign up to follow #{@label}"
        contextModule: @context_module
        destination: @href
        afterSignUpAction: {
          kind: @modelName.toLowerCase()
          action: 'follow'
          objectId: @model.id
        }
        intent: @getIntent()
      })
      return false

    analyticsOptions = {
      contextModule: @context_module,
      contextOwnerId: @context_page_owner_id,
      contextOwnerSlug: @context_page_owner_slug,
      contextOwnerType: @context_page,
      ownerId: @model.get('_id'),
      ownerSlug: @model.id,
    }

    # trackEvent
    if @following.isFollowing @model.id
      @following.unfollow @model.id
      mediator.trigger 'follow-button:unfollow', @$el, @model
      @trigger 'unfollowed'
      switch @modelName
        when 'artist'
          trackEvent(unfollowedArtist(analyticsOptions))
        when 'fair'
          trackEvent(unfollowedFair(analyticsOptions))
        when 'gene'
          trackEvent(unfollowedGene(analyticsOptions))
        when 'profile'
          trackEvent(unfollowedPartner(analyticsOptions))
        else
          window.analytics.track("Unfollowed #{@modelName}", analyticsOptions)
    else
      @following.follow @model.id, notes: (@notes or @analyticsFollowMessage)
      $('.artist-suggestion-popover').remove()
      if @artistSuggestionsView?
        @artistSuggestionsView.renderSuggestedArtists()

      # Delay label change
      @$el.addClass 'is-clicked'
      setTimeout (=> @$el.removeClass 'is-clicked'), 1500
      mediator.trigger 'follow-button:follow', @$el, @model
      @trigger 'followed'
      switch @modelName
        when 'artist'
          trackEvent(followedArtist(analyticsOptions))
        when 'fair'
          trackEvent(followedFair(analyticsOptions))
        when 'gene'
          trackEvent(followedGene(analyticsOptions))
        when 'profile'
          trackEvent(followedPartner(analyticsOptions))
        else
          window.analytics.track("Followed #{@modelName}", analyticsOptions)

    false
