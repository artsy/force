Backbone = require 'backbone'
{ CATEGORIES, MAIN_PROFILES, CURRENT_USER } = require('sharify').data
{ FeaturedCities } = require 'places'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profiles = require '../../../../collections/profiles.coffee'
PartnerCategories = require '../../../../collections/partner_categories.coffee'
LandingCarouselView = require './landing.coffee'
PrimaryCarousel = require '../../components/primary_carousel/view.coffee'
SearchResultsView = require '../../components/search_results/view.coffee'
filtersTemplate = -> require('../../templates/search_filters.jade') arguments...
resultsTemplate = -> require('../../components/search_results/template.jade') arguments...

module.exports = class PartnersSearchView extends Backbone.View

  el: $('.galleries-institutions-page')

  events:
    'click .partner-search-filter-item' : 'filterSelected'

  initialize: ({ @params }) ->
    @listenTo @params, 'change firstLoad', @renderFilters
    @listenTo @params, 'change', @updateUrl

    @allCategories = new PartnerCategories CATEGORIES
    @allCities = FeaturedCities

    if CURRENT_USER?
      following = new Following [], kind: 'profile'
      mainCarouselIds = _.pluck MAIN_PROFILES, 'id'
      following.syncFollows mainCarouselIds

    new LandingCarouselView
      following: following
      params: @params
      el: $('.js-partner-category-carousels')

    new PrimaryCarousel
      following: following
      params: @params
      profiles: new Profiles MAIN_PROFILES
      el: @$('.galleries-institutions-primary-carousel')

    new SearchResultsView
      params: @params
      el: @$('.galleries-institutions-search-results')

    @$filters = @$('.galleries-institutions-search-filters')
    @params.trigger 'firstLoad', @params

  renderFilters: =>
    @$filters.html filtersTemplate
      selectedFilters:@params.currentSelection()
      categories: @allCategories.models
      locations: @allCities

  updateUrl: ->
    if @params.hasSelection()
      window.history.replaceState {}, null, "/#{sd.PARTNERS_ROOT}?#{@params.urlQueryString()}"
    else
      window.history.replaceState {}, null, "/#{sd.PARTNERS_ROOT}"

  filterSelected: (e) =>
    e.preventDefault()
    target = $(e.target)
    key = target.attr('data-filter')

    if (value = target.attr 'data-id')
      @params.set key, value
    else
      @params.unset key
