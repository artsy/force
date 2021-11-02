_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Backbone = require 'backbone'
Following = require '../follow_button/collection.coffee'
{ UserInterests } = require '../../collections/user_interests'
TypeaheadView = require '../typeahead/view.coffee'
ResultsListView = require '../results_list/view.coffee'

module.exports = class UserInterestsView extends Backbone.View
  defaults:
    autofocus: false
    # When `null` a logged in CurrentUser must be present
    collectorProfile: null

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults
    _.map @defaults, (v, k) => this[k] = @options[k]

    @collection ?= new UserInterests [], collectorProfile: @collectorProfile
    @following = new Following [], kind: 'artist'

    @resultsList = new ResultsListView
      typeahead: new TypeaheadView
        autofocus: @autofocus
        placeholder: 'Search artists'
        kind: 'artists'

    @listenTo @resultsList, 'add', @interested
    @listenTo @resultsList, 'remove', @uninterested
    @listenTo @collection, 'sync', ->
      @resultsList.reset @collection.interests()

  interested: (interest) ->
    userInterest = @collection.addInterest interest
    userInterest.save()
    @following.follow interest.id if CURRENT_USER?
    window.analytics.track("Added an artist to their collection", {
      artist: interest.id,
    })

  uninterested: (interest) ->
    userInterest = @collection.findByInterestId interest.id
    userInterest.destroy()
    window.analytics.track("Removed an artist from their collection", {
      artist: interest.id
    })

  render: ->
    @$el.html @resultsList.render().$el
    this

  remove: ->
    @resultsList.remove()
    super
