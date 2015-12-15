Backbone = require 'backbone'
PartnersSearch = require '../../components/partners_search/partners_search.coffee'
PartnerCategories = require '../../../../collections/partner_categories.coffee'
{CATEGORIES} = require('sharify').data
{ FeaturedCities } = require 'places'

filtersTemplate = -> require('../../components/partners_search/search_filters.jade') arguments...
resultsTemplate = -> require('../../components/partners_search/results.jade') arguments...

module.exports = class PartnersSearchView extends Backbone.View

  el: $('#partners-search')

  events:
    'click .partner-search-filter-item' : 'filterSelected'

  initialize: ({ @params }) ->
    @allCategories = new PartnerCategories CATEGORIES
    @allCities = FeaturedCities

    @search = new PartnersSearch

    @listenTo @search.get('partners'), 'sync', @renderResults

    @$searchResults = @$('.search-results')
    @$filters = @$('.search-filters')

  renderFilters: (params) ->
    @$filters.html filtersTemplate selectedFilters:params.pick('category', 'location'), categories: @allCategories.models, locations: @allCities

  renderResults: ->
    @$searchResults.html resultsTemplate partners: @search.get('partners').models

  update: ->
    @renderFilters @params
    @search.fetch @params

  filterSelected: (e) =>
    e.preventDefault()
    target = $(e.target)
    key = target.attr('data-filter')

    if (value = target.attr 'data-id') is 'all'
      @params.unset key
    else
      @params.set key, value
