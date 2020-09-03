Backbone = require 'backbone'
SearchBarView = require '../../search_bar/view.coffee'
teleport = require './teleport.coffee'
{ modelNameAndIdToLabel } = require '../../../lib/analytics_helpers.coffee'

module.exports = class FairNavView extends Backbone.View
  initialize: ({ fair, model }) ->
    @searchBarView ?= new SearchBarView
      el: @$('.fair-layout-search')
      $input: @$('.fair-layout-search-input')
      fairId: fair.id

    @$('.fair-layout-search-input').on 'focus', ->
      window.analytics.track("Focused on search input at fair")

    @searchBarView.on 'search:entered', (term) ->
      window.analytics.track("Hit enter on fair search")

      teleport "#{model.href()}/search?q=#{term}"

    @searchBarView.on 'search:selected', (e, model) ->
      return false unless model and model.get('published')
      model.updateForFair fair
      window.analytics.track "Selected item from fair search",
        label: modelNameAndIdToLabel model.get('display_model'), model.id
        query: @query
      @selected = true

      teleport model.get 'location'
