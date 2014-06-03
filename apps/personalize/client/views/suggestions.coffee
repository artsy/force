_                             = require 'underscore'
sd                            = require('sharify').data
Backbone                      = require 'backbone'
StepView                      = require './step.coffee'
mediator                      = require '../../../../lib/mediator.coffee'
Followable                    = require '../mixins/followable.coffee'
OrderedSets                   = require '../../../../collections/ordered_sets.coffee'
Partner                       = require '../../../../models/partner.coffee'
Profiles                      = require '../../../../collections/profiles.coffee'
LocationModalView             = require '../../components/location_modal/index.coffee'
{ FollowButton, Following }   = require '../../../../components/follow_button/index.coffee'

suggestedTemplate = -> require('../../templates/suggested_profiles.jade') arguments...

module.exports = class SuggestionsView extends StepView
  _.extend @prototype, Followable

  suggestedTemplate: ->
    suggestedTemplate arguments...

  kind       : 'default'
  followKind : 'default'

  events:
    'click .personalize-skip'                     : 'advance'
    'click .pfa-remove'                           : 'unfollow'
    'click .grid-item'                            : 'followSuggestion'
    'click #personalize-suggestions-location'     : 'changeLocation'
    'click #personalize-suggestions-unfollow-all' : 'unfollowSuggestions'

  initialize: (options = {}) ->
    super

    @following = new Following null, kind: @followKind

    @suggestions      = new Profiles
    @suggestions.url  = "#{sd.API_URL}/api/v1/me/suggested/profiles"

    @ensureLocation()

    @setup()

  # Delegates to the follow button
  followSuggestion: (e) ->
    $(e.currentTarget).find('.follow-button').click()

  ensureLocation: ->
    unless @user.hasLocation()
      @user.approximateLocation success: @renderLocation

  renderLocation: =>
    @$('#personalize-suggestions-location').text @user.location().singleWord()

  unfollowSuggestions: (e) ->
    e.preventDefault()
    @following.unfollowAll @suggestions.pluck('id')

  setup: ->
    @suggestions.fetch
      success: =>
        @following.followAll @suggestions.pluck('id')
        @following.unfollowAll(@existingSuggestions) if @existingSuggestions?
        @renderSuggestions()
    @initializeFollowable()

  render: ->
    @$el.html @template(user: @user, state: @state, autofocus: @autofocus())
    @setupSearch mode: 'profiles', restrictType: @restrictType
    this

  changeLocation: (e) ->
    e.preventDefault()

    @existingSuggestions = @suggestions.pluck('id')
    @listenToOnce @user, 'sync', ->
      @$container.attr 'data-state', 'loading'
      @renderLocation()
      @setup()

    new LocationModalView width: '500px', user: @user

  setupFollowButton: (model, el) ->
    key = model.id
    @followButtonViews ?= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      analyticsUnfollowMessage : "Unfollowed #{@kind} from personalize #{@kind} suggestions"
      analyticsFollowMessage   : "Followed #{@kind} from personalize #{@kind} suggestions"
      notes                    : 'Followed from /personalize'
      following                : @following
      model                    : model
      modelName                : @kind
      el                       : el

  renderSuggestions: ->
    (@$container ?= @$('#personalize-suggestions-container')).
      attr 'data-state', 'loaded'

    (@$suggestions ?= @$('#personalize-suggestions')).
      html @suggestedTemplate(suggestions: @suggestions)

    @locationRequests = @fetchAndRenderLocations()

    @fallbackImages()

    # Attach FollowButton views
    @suggestions.each (model) =>
      button = @setupFollowButton model, @$suggestions.find(".follow-button[data-id='#{model.id}']")
      @listenTo button, 'click', => @setSkipLabel()

  fetchAndRenderLocations: ->
    @suggestions.map (profile) =>
      partner = new Partner(profile.get 'owner')
      partner.locations().fetch
        success: =>
          @$suggestions.
            find(".personalize-suggestion-location[data-id='#{partner.id}']").
            html partner.displayLocations(@user.get('location')?.city)

  fallbackImages: ->
    @suggestions.map (profile) ->
      unless profile.coverImage().has 'image_versions'
        # Filter out the user_profile default image
        unless /user_profile.png/.test (imageUrl = profile.iconImageUrl())
          $(".hoverable-image-link[data-id='#{profile.id}'] .hoverable-image").
            addClass('is-fallback').
            css(backgroundImage: "url(#{imageUrl})")

  abortLocationRequests: ->
    _.each @locationRequests, (xhr) -> xhr.abort()

  advance: ->
    @abortLocationRequests()
    super

  remove: ->
    @searchBarView.remove()
    if @suggestions? then @suggestions.map (model) =>
      @followButtonViews[model.id].remove()
    super
