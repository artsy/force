Backbone          = require 'backbone'
SearchBarView     = require '../../../../components/search_bar/view.coffee'
analytics         = require '../../../../lib/analytics.coffee'
followedTemplate  = -> require('../../templates/followed.jade') arguments...

# Common functionality between views with auto-complete/following
module.exports =
  initializeFollowable: ->
    @followed ?= new Backbone.Collection

    @listenTo @followed, 'add', @renderFollowed
    @listenTo @followed, 'remove', @renderFollowed

    throw 'Followable requires a @following collection' unless @following?

  setupSearch: (options = {}) ->
    @searchBarView = new SearchBarView
      mode         : options.mode
      restrictType : options.restrictType
      el           : @$('#personalize-search-container')
      $input       : @$searchInput ?= @$('#personalize-search')

    @listenTo @searchBarView, 'search:selected', @follow

  renderFollowed: ->
    @$('#personalize-followed').html followedTemplate(models: @followed.models)

  setSkipLabel: ->
    return if @__labelSet__
    label = if @state.almostDone() then 'Done' else 'Next'
    @$('.personalize-skip').text label
    @__labelSet__ = true

  follow: (e, model) ->
    @setSkipLabel()
    @$searchInput.val '' # Clear input
    @followed.unshift model.toJSON()
    @following.follow model.id, { notes: 'Followed from /personalize' }

    # Fallback in case model doesn't have display_model
    displayModel = model.get('display_model') or 'displayModelUnknown'
    analytics.track.click @analyticsFollowMessage, label: analytics.modelNameAndIdToLabel(displayModel, model.get('id'))

  unfollow: (e) ->
    id      = $(e.currentTarget).data 'id'
    model   = @followed.remove id
    @following.unfollow id

    displayModel = model.get('display_model') or 'displayModelUnknown'
    analytics.track.click @analyticsUnfollowMessage, label: analytics.modelNameAndIdToLabel(displayModel, model.get('id'))
