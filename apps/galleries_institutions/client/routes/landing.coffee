_ = require 'underscore'
Backbone = require 'backbone'
{ CAROUSELS, CURRENT_USER } = require('sharify').data
Partners = require '../../../../collections/partners.coffee'
fetchLocationCarousel = require '../../components/location_carousel/index.coffee'
PartnerCellCarouselView = require '../../components/partner_cell_carousel/view.coffee'

module.exports = class LandingCarouselView extends Backbone.View

  initialize: ({ @following, params }) ->
    @listenTo params, 'change:location change:category firstLoad', @paramsChanged

  setup: (type) ->
    return if @loaded
    if CURRENT_USER?
      partners = _.flatten _.pluck CAROUSELS, 'partners'
      categoryCarouselIds = _.pluck partners, 'default_profile_id'
      @following.syncFollows categoryCarouselIds

    carouselViews = CAROUSELS.map ({ category, partners }) ->
      category = new Backbone.Model category
      partners = new Partners partners

      partners.each (partner) ->
        partner.related().profile.fetch()
        partner.related().locations.fetch()

      view = new PartnerCellCarouselView
        following: @following
        category: category
        partners: partners

      view.render()

    @$el.html _.pluck carouselViews, '$el'

    @loaded = true

    fetchLocationCarousel(type).then ({ category, partners }) ->

      return unless partners.length > 3

      view = new PartnerCellCarouselView
        following: @following
        category: category
        partners: partners

      @$el.prepend view.render().$el

      return unless CURRENT_USER?

      @following.syncFollows partners.pluck 'default_profile_id'

  paramsChanged: (params) ->
    if params.hasSelection()
      @$el.hide()
    else
      @$el.show()
      @setup(params.get('type')) if not @loaded
