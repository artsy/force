_                 = require 'underscore'
sd                = require('sharify').data
Backbone          = require 'backbone'
SuggestionsView   = require './suggestions.coffee'
Profiles          = require '../../../../collections/profiles.coffee'

template = -> require('../../templates/galleries.jade') arguments...

module.exports = class GalleriesView extends SuggestionsView
  template: ->
    template arguments...

  kind                     : 'gallery'
  followKind               : 'profile'
  restrictType             : 'PartnerGallery'
  analyticsFollowMessage   : 'Followed gallery from personalize gallery search'
  analyticsUnfollowMessage : 'Unfollowed gallery from personalize gallery search'

  fetchAndRenderSuggestions: (options = {}) ->
    @suggestions = new Profiles
    if @state.get 'reonboarding'
      @fetchAutoFollowedProfiles().then (response) =>
        # Fallback if the user doesn't actually have auto-follows
        @actuallyFetchSuggestions() unless response.length
    else
      @actuallyFetchSuggestions()

  actuallyFetchSuggestions: ->
    @suggestions.url = "#{sd.API_URL}/api/v1/me/suggested/profiles"
    @suggestions.fetch success: =>
      @following.followAll @suggestions.pluck('id')
      @following.unfollowAll(@existingSuggestions) if @existingSuggestions?
      @renderSuggestions()
