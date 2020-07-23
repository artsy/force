_ = require 'underscore'
Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
Partners = require '../../../../collections/partners.coffee'
Profile = require '../../../../models/profile.coffee'
fetchLocationCarousel = require '../../components/location_carousel/index.coffee'
carouselTemplate = -> require('../../components/partner_cell_carousel/template.jade') arguments...
PartnerCellCarouselView = require '../../components/partner_cell_carousel/view.coffee'
facetDefaults = require '../../components/filter_facet/facet_defaults.coffee'

module.exports = class LandingCarouselView extends Backbone.View
  events:
    'click .pcc-see-all': 'seeAllClicked'

  initialize: ({ @following, @params }) ->
    @listenTo @params, 'firstLoad', @paramsChanged

    _.each _.pluck(facetDefaults(), 'facetName'), (f) =>
      @listenTo @params, "change:#{f}", @paramsChanged

  setup: (type) ->
    return Promise.resolve() if @loaded
    @carousels = @$('.partner-category-carousel').map (index, el) =>
      carousel = new PartnerCellCarouselView
        el: $(el),
        following: @following
      carousel.postRender()

    @loaded = true

    fetchLocationCarousel(type).then (category) =>
      return if category.partners.length < 3
      @carousels.push carousel = new PartnerCellCarouselView
        following: @following
        model: category

      @$el.prepend carousel.render().$el
      @following.syncFollows _.pluck category.partners, 'default_profile_id' if CURRENT_USER?

  seeAllClicked: (e) ->
    e.preventDefault()
    $(window).scrollTop()
    $target = $(e.target)
    facetName = $target.attr 'data-facet'
    id = $target.attr 'data-id'

    @params.set facetName, id if facetName and id

  paramsChanged: (params) ->
    # Do nothing if results view should be displayed
    return if params.hasSelection()

    # Re-render flickity if flickity has already been initialized
    if @loaded
      @resizeCarousels()

    # Setup flickity for the first time
    else
      @setup(params.get('type'))

  resizeCarousels: ->
    _.defer =>
      _.each @carousels, (carousel) ->
        carousel.flickity.resize()
