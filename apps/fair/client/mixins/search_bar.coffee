SearchBarView   = require '../../../../components/search_bar/view.coffee'
analytics       = require '../../../../lib/analytics.coffee'

module.exports =
  setupSearch: (profile, fair) ->
    @searchBarView ?= new SearchBarView
      el     : @$('#fair-search-container')
      $input : @$('#fair-search-input')
      fairId : @fair.id

    @$('#fair-search-input').on 'focus', ->
      analytics.track.click 'Focused on search input at fair'

    @searchBarView.on 'search:entered', (term) =>
      analytics.track.click 'Hit enter on fair search'
      window.location = "#{@model.href()}/search?q=#{term}"

    @searchBarView.on 'search:selected', (e, model) ->
      return false unless model and model.get('published')
      model.updateForFair fair
      analytics.track.click 'Selected item from fair search',
        label: analytics.modelNameAndIdToLabel model.get('display_model'), model.id
        query: @query
      @selected = true
      window.location = model.get 'location'
