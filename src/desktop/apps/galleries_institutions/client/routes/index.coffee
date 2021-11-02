Backbone = require 'backbone'
_ = require 'underscore'
_s = require 'underscore.string'
{ MAIN_PROFILES, CURRENT_USER } = require('sharify').data
{ Following } = require '../../../../components/follow_button/index'
{ Profiles } = require '../../../../collections/profiles'
LandingCarouselView = require './landing.coffee'
PrimaryCarousel = require '../../components/primary_carousel/view.coffee'
SearchResultsView = require '../../components/search_results/view.coffee'
FilterDropdownView = require '../../components/dropdown/filter_dropdown_view.coffee'
FetchFilterPartners = require '../../components/parameters/fetch_filter_partners.coffee'
initFacets = require '../../components/filter_facet/init_filter_facets.coffee'

module.exports = class PartnersView extends Backbone.View
  events:
    'click .galleries-institutions-carousels .mgr-cell.js-mgr-cell.partner-cell a': 'trackCellClick'

  initialize: ({ @params, @root }) ->
    @listenTo @params, 'change', @paramsChanged
    @listenTo @params, 'firstLoad', @updateResultsHeading

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

    @filterPartners = new FetchFilterPartners params: @params

    @facets = initFacets(params: @params, aggregations: @filterPartners.aggregations)

    @dropdownViews = _.map @facets, (facet) =>
      new FilterDropdownView
        el: @$(".galleries-institutions-search-filters .dropdown-#{facet.facetName}")
        params: @params
        filterPartners: @filterPartners
        facet: facet

    resultsView = new SearchResultsView
      filterPartners: @filterPartners
      following: following
      params: @params
      el: @$('.galleries-institutions-search-results')

    @params.trigger 'firstLoad', @params

  paramsChanged: ->
    @$('.galleries-institutions-main-content').attr 'data-state', (if @params.hasSelection() then 'search' else 'landing')
    @updateUrl()
    @updateResultsHeading()

  updateResultsHeading: ->
    locationName = @dropdownViews[0].currentSelectionName()
    categoryName = @dropdownViews[1].currentSelectionName()
    resultsTitle = _.compact([
      "All"
      categoryName
      _s.capitalize @root
      if (locationName) then "near #{locationName}"
    ]).join ' '
    @$('.galleries-institutions-results-heading').text(resultsTitle)

  updateUrl: ->
    window.history.replaceState {}, null, @url()

  url: ->
    if @params.hasSelection()
      "/#{@root}?#{@params.urlQueryString()}"
    else
      "/#{@root}"

  trackCellClick: (e) ->
    partnerSlug = e.currentTarget.pathname.replace('/', '')
    window.analytics.track("Clicked Galleries Featured Link", {
      partner_slug: partnerSlug,
    })
