Backbone = require 'backbone'
TypeaheadView = require '../../../../../components/typeahead/view'
analyticsHooks = require '../../../../../lib/analytics_hooks'
{ modelNameAndIdToLabel } = require '../../../../../lib/analytics_helpers'
followedTemplate = -> require('../../templates/followed.jade') arguments...

# Common functionality between views with auto-complete/following
module.exports =
  initializeFollowable: ->
    @followed ?= new Backbone.Collection

    @listenTo @followed, 'add', @renderFollowed
    @listenTo @followed, 'remove', @renderFollowed

    throw 'Followable requires a @following collection' unless @following?

  setupSearch: ({ mode }) ->
    @typeahead = new TypeaheadView
      kind: mode
      autofocus: true
      placeholder: 'Search artists'

    @$('#artsy-primer-personalize-search-container').html @typeahead.render().$el

    @listenTo @typeahead, 'selected', @follow

  renderFollowed: ->
    @$('#artsy-primer-personalize-followed').html followedTemplate(models: @followed.models)

  setSkipLabel: ->
    return if @__labelSet__
    label = if @state.almostDone() then 'Done' else 'Next'
    @$('.artsy-primer-personalize-skip').text label
    @__labelSet__ = true

  follow: (model) ->
    @setSkipLabel()
    @followed.unshift model.toJSON()
    @following.follow model.get('id'), { notes: 'Followed from /personalize' }

    # Fallback in case model doesn't have display_model
    displayModel = model.get('display_model') or 'displayModelUnknown'
    analyticsHooks.trigger 'followable:followed',
      message: @analyticsFollowMessage
      modelName: displayModel
      id: model.get('id')

  unfollow: (e) ->
    id = $(e.currentTarget).data 'id'
    model = @followed.remove id
    @following.unfollow id

    displayModel = model.get('display_model') or 'displayModelUnknown'
    analyticsHooks.trigger 'followable:followed',
      message: @analyticsUnfollowMessage
      modelName: displayModel
      id: model.get('id')
