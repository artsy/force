_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../lib/analytics.coffee'
SearchBarView = require '../search_bar/view.coffee'
Following = require '../follow_button/collection.coffee'
UserInterests = require '../../collections/user_interests.coffee'
template = -> require('./templates/index.jade') arguments...
collectionTemplate = -> require('./templates/collection.jade') arguments...

module.exports = class UserInterestsView extends Backbone.View
  template: ->
    template arguments...
  collectionTemplate: ->
    collectionTemplate arguments...

  events:
    'click .js-user-interest-remove': 'uninterested'

  defaults:
    persist: true
    mode: 'post'

  initialize: (options = {}) ->
    { @limit,
      @autofocus,
      @mode,
      @persist,
      @collectorProfile } = _.defaults options, @defaults

    @collection = new UserInterests [], collectorProfile: @collectorProfile
    @following = new Following [], kind: 'artist'

    @listenTo @collection, 'sync add remove', @renderCollection

  interested: (e, model) ->
    userInterest = @collection.addInterest model
    if @persist
      options = @collectorProfile.pick('anonymous_session_id') if @collectorProfile?
      userInterest.save options or {}

    if @persist and CURRENT_USER?
      @following.follow model.id

    @autocomplete.clear()

    analytics.track.other 'Added an artist to their collection'

  uninterested: (e) ->
    id = $(e.currentTarget).data 'id'
    model = @collection.findByInterestId id

    if @collectorProfile?
      options =
        data: @collectorProfile.pick('anonymous_session_id')
        processData: true

    model.destroy options or {}

    @autocomplete.$input.focus()

    analytics.track.other 'Removed an artist from their collection'

  saveAll: ->
    @collection.invoke 'save'

  renderCollection: ->
    @trigger 'render:collection'

    (@$collection ?= @$('.js-user-interests-results'))
      .html @collectionTemplate
        userInterests: @collection

    _.defer =>
      @$collection.addClass 'is-fade-in'

  postRender: ->
    @autocomplete = new SearchBarView
      el: @$('.js-user-interests-search')
      mode: 'artists'
      limit: @limit
      autoselect: true
      displayKind: false
      shouldDisplaySuggestions: false

    @listenTo @autocomplete, 'search:selected', @interested

  render: ->
    @$el.html @template
      autofocus: @autofocus
      mode: @mode
    @postRender()
    this

  remove: ->
    @autocomplete.remove()
    super
