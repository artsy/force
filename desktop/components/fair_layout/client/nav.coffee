Backbone = require 'backbone'
SearchBarView = require '../../search_bar/view'
teleport = require './teleport'
analyticsHooks = require '../../../lib/analytics_hooks'
{ modelNameAndIdToLabel } = require '../../../lib/analytics_helpers'

module.exports = class FairNavView extends Backbone.View
  initialize: ({ fair, model }) ->
    @searchBarView ?= new SearchBarView
      el: @$('.fair-layout-search')
      $input: @$('.fair-layout-search-input')
      fairId: fair.id

    @$('.fair-layout-search-input').on 'focus', ->
      analyticsHooks.trigger 'fair:search:focus'

    @searchBarView.on 'search:entered', (term) =>
      analyticsHooks.trigger 'fair:search:enter'

      teleport "#{model.href()}/search?q=#{term}"

    @searchBarView.on 'search:selected', (e, model) ->
      return false unless model and model.get('published')
      model.updateForFair fair
      analyticsHooks.trigger 'fair:search:select',
        label: modelNameAndIdToLabel model.get('display_model'), model.id
        query: @query
      @selected = true

      teleport model.get 'location'
