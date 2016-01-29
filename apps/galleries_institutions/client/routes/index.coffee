Backbone = require 'backbone'
{ MAIN_PROFILES, CURRENT_USER } = require('sharify').data
{ FeaturedCities } = require 'places'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profiles = require '../../../../collections/profiles.coffee'
LandingCarouselView = require './landing.coffee'
PrimaryCarousel = require '../../components/primary_carousel/view.coffee'
SearchResultsView = require '../../components/search_results/view.coffee'
FilterDropdownView = require '../../components/filters/filter_dropdown_view.coffee'
FilterPartners = require '../../components/filters/filter_partners.coffee'
initFacets = require '../../components/filters/init_filter_facets.coffee'
module.exports = class PartnersSearchView extends Backbone.View

  el: $('.galleries-institutions-page')

  initialize: ({ @params, @root }) ->
    @listenTo @params, 'change', @paramsChanged

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

    filterPartners = new FilterPartners params: @params

    facets = initFacets(params: @params, aggregations: filterPartners.aggregations)

    _.each facets, (facet) =>
      new FilterDropdownView
        el: @$(".galleries-institutions-search-filters .search-#{facet.facetName}")
        params: @params
        filterPartners: filterPartners
        facet: facet

    resultsView = new SearchResultsView
      filterPartners: filterPartners
      following: following
      params: @params
      el: @$('.galleries-institutions-search-results')

    @params.trigger 'firstLoad', @params

  paramsChanged: ->
    @$('.galleries-institutions-main-content').attr 'data-state', (if @params.hasSelection() then 'search' else 'landing')
    @updateUrl()

  updateUrl: ->
    if @params.hasSelection()
      window.history.replaceState {}, null, "/#{@root}?#{@params.urlQueryString()}"
    else
      window.history.replaceState {}, null, "/#{@root}"
