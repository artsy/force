_ = require 'underscore'
{ CURRENT_USER } = require('sharify').data
Backbone = require 'backbone'
analytics = require '../../lib/analytics.coffee'
TypeaheadView = require '../typeahead/view.coffee'
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
    autofocus: false
    persist: true
    # When `null` a logged in CurrentUser must be present
    collectorProfile: null

  initialize: (options = {}) ->
    { @autofocus,
      @persist,
      @collectorProfile } = _.defaults options, @defaults

    @collection ?= new UserInterests [], collectorProfile: @collectorProfile
    @following = new Following [], kind: 'artist'

    @listenTo @collection, 'sync add remove', @renderCollection
    @listenTo @collection, 'sync add remove', @syncExclusions

  syncExclusions: ->
    @typeahead?.selected = @collection.map (x) ->
      x.related().interest.id

  interested: (model) ->
    userInterest = @collection.addInterest model
    userInterest.save()

    @following.follow model.id if CURRENT_USER?

    analytics.track.other 'Added an artist to their collection'

  uninterested: (e) ->
    id = $(e.currentTarget).data 'id'
    model = @collection.findByInterestId id
    model.destroy()

    analytics.track.other 'Removed an artist from their collection'

  renderCollection: ->
    @trigger 'render:collection'

    (@$collection ?= @$('.js-user-interests-results'))
      .html @collectionTemplate
        userInterests: @collection

    _.defer =>
      @$collection.addClass 'is-fade-in'

  postRender: ->
    @typeahead = new TypeaheadView
      autofocus: @autofocus
      kind: 'artists'
      placeholder: 'Search artists'

    @$('.js-user-interests-search')
      .html @typeahead.render().$el

    @listenTo @typeahead, 'selected', @interested

  render: ->
    @$el.html @template()
    @postRender()
    this

  remove: ->
    @typeahead.remove()
    super
