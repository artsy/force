_                   = require 'underscore'
Backbone            = require 'backbone'
StepView            = require './step.coffee'
Followable          = require '../mixins/followable.coffee'
OrderedSets         = require '../../../../collections/ordered_sets.coffee'
FollowButton        = require '../../../partners/client/follow_profiles_button.coffee'
FollowCollection    = require '../../../../collections/follow_profiles.coffee'
Partner             = require '../../../../models/partner.coffee'
{ isTouchDevice }   = require '../../../../components/util/device.coffee'
suggestedTemplate   = -> require('../../templates/suggested_profiles.jade') arguments...

module.exports = class SuggestionsView extends StepView
  _.extend @prototype, Followable

  events:
    'click .personalize-skip'             : 'advance'
    'click .personalize-suggestions-more' : 'loadNextPage'
    'click .pfa-remove'                   : 'unfollow'

  initialize: (options) ->
    super

    @followCollection   = new FollowCollection
    @suggestedSets      = new OrderedSets(key: @key)

    @suggestedSets.fetchAll()

    @listenTo @suggestedSets, 'sync:complete', @setupSuggestions
    @listenTo @suggestedSets, 'sync:complete', @autoFollow

    @initializeFollowable()

  loadNextPage: (e) ->
    e.preventDefault()
    ($target = $(e.currentTarget)).attr 'data-state', 'loading'
    @suggestions.getNextPage().then (response) ->
      if response.length
        $target.attr 'data-state', 'loaded'
      else
        $target.hide()

  render: ->
    @$el.html @template(state: @state, isTouchDevice: isTouchDevice())
    @setupSearch { mode: 'profiles', restrictType: @restrictType }
    this

  setupSuggestions: ->
    @$('#personalize-suggestions-container').attr 'data-state', 'loaded'
    @suggestions = @suggestedSets.findWhere(key: @key).get('items')
    @listenTo @suggestions, 'sync', @renderSuggestions
    @renderSuggestions()

  setupFollowButton: (model, el) ->
    key = model.id
    @followButtonViews ||= {}
    @followButtonViews[key].remove() if @followButtonViews[key]?
    @followButtonViews[key] = new FollowButton
      analyticsUnfollowMessage: 'Unfollowed profile from personalize profile suggestions'
      analyticsFollowMessage:   'Followed profile from personalize profile suggestions'
      notes:                    'Followed from /personalize'
      collection:               @followCollection
      model:                    model
      el:                       el

  rows: (n) ->
    _.compact @suggestions.map (model, i) =>
      @suggestions.slice(i, i + n) if i % n is 0

  renderSuggestions: ->
    (@$suggestions ||= @$('#personalize-suggestions')).
      append suggestedTemplate(rows: @rows(4))

    @followCollection.syncFollows @suggestions.pluck('id')

    @fetchAndRenderLocations()

    # Attach FollowButton views
    @suggestions.each (model) =>
      @setupFollowButton model, @$suggestions.find(".follow-button[data-id='#{model.id}']")

  fetchAndRenderLocations: ->
    @suggestions.each (profile) =>
      partner = new Partner(profile.get 'owner')
      partner.locations().fetch
        success: =>
          @$suggestions.
            find(".personalize-suggestion-location[data-id='#{partner.id}']").
            html partner.displayLocations(@user.get('location')?.city)

  remove: ->
    @searchBarView.remove()
    if @suggestions? then @suggestions.fullCollection.map (model) =>
      @followButtonViews[model.id].remove()
    super
