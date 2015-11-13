Backbone = require 'backbone'
SearchBarView = require '../../search_bar/view.coffee'
teleport = require './teleport.coffee'
analytics = require '../../../lib/analytics.coffee'

module.exports = class FairNavView extends Backbone.View
  initialize: (options) ->
    { fair, model } = options
    @searchBarView ?= new SearchBarView
      el: @$('.fair-layout-search')
      $input: @$('.fair-layout-search-input')
      fairId: fair.id

    @$('.fair-layout-search-input').on 'focus', ->
      analytics.track.click 'Focused on search input at fair'

    @searchBarView.on 'search:entered', (term) =>
      analytics.track.click 'Hit enter on fair search'

      teleport "#{model.href()}/search?q=#{term}"

    @searchBarView.on 'search:selected', (e, model) ->
      return false unless model and model.get('published')
      model.updateForFair fair
      analytics.track.click 'Selected item from fair search',
        label: analytics.modelNameAndIdToLabel model.get('display_model'), model.id
        query: @query
      @selected = true

      teleport model.get 'location'
