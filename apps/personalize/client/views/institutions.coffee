_                 = require 'underscore'
OrderedSets       = require '../../../../collections/ordered_sets.coffee'
SuggestionsView   = require './suggestions.coffee'
Profiles          = require '../../../../collections/profiles.coffee'

template = -> require('../../templates/institutions.jade') arguments...

module.exports = class InstitutionsView extends SuggestionsView
  template: ->
    template arguments...

  followKind               : 'profile'
  kind                     : 'institution'
  restrictType             : 'PartnerMuseum'
  analyticsUnfollowMessage : 'Unfollowed institutions from personalize institutions search'
  analyticsFollowMessage   : 'Followed institutions from personalize institutions search'

  key: 'personalize:suggested-institutions'

  fetchAndRenderSuggestions: (options = {}) ->
    @suggestedSets = new OrderedSets key: @key
    @suggestedSets.fetchAll().then =>
      @suggestions = @suggestedSets.findWhere(key: @key).get 'items'
      @renderSuggestions()
      @following.syncFollows @suggestions.pluck('id')
      # For next page(s)
      @suggestions.on 'sync', =>
        @$suggestions.append @suggestedTemplate(suggestions: @suggestions)
        @following.syncFollows @suggestions.pluck('id')
        @postRenderSuggestions()
