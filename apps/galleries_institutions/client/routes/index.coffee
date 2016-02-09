Backbone = require 'backbone'
{ MAIN_PROFILES, CURRENT_USER } = require('sharify').data
{ FeaturedCities } = require 'places'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profiles = require '../../../../collections/profiles.coffee'
LandingCarouselView = require './landing.coffee'
PrimaryCarousel = require '../../components/primary_carousel/view.coffee'
SearchResultsView = require '../../components/search_results/view.coffee'
FilterDropdownView = require '../../components/dropdown/filter_dropdown_view.coffee'
# PartnerSearchView = require '../../components/dropdown/partner_search_view.coffee'
FetchFilterPartners = require '../../components/parameters/fetch_filter_partners.coffee'
initFacets = require '../../components/filter_facet/init_filter_facets.coffee'
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

    filterPartners = new FetchFilterPartners params: @params

    facets = initFacets(params: @params, aggregations: filterPartners.aggregations)

    _.each facets, (facet) =>
      new FilterDropdownView
        el: @$(".galleries-institutions-search-filters .dropdown-#{facet.facetName}")
        params: @params
        filterPartners: filterPartners
        facet: facet

    # Hold off until partners endpoint supports search
    # new PartnerSearchView
    #   el: @$('.galleries-institutions-search-filters .partners-search-dropdown')
    #   type: @params.get('type')

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
