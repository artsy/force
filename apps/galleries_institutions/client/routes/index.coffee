_ = require 'underscore'
Backbone = require 'backbone'
{ MAIN_PROFILES, CAROUSELS, CURRENT_USER } = require('sharify').data
Partners = require '../../../../collections/partners.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
initPrimaryCarousel = require '../../components/primary_carousel/index.coffee'
fetchLocationCarousel = require '../../components/location_carousel/index.coffee'
PartnerCellCarouselView = require '../../components/partner_cell_carousel/view.coffee'

module.exports = (type) ->
  partners = new Partners()
  partners.fetchUntilEndInParallel
    cache: true
    data:
      size: 20
      type: 'PartnerGallery'
      sort: 'sortable_id'
      has_full_profile: true

  if CURRENT_USER?
    following = new Following [], kind: 'profile'
    partners = _.flatten _.pluck CAROUSELS, 'partners'
    mainCarouselIds = _.pluck MAIN_PROFILES, 'id'
    categoryCarouselIds = _.pluck partners, 'default_profile_id'
    ids = mainCarouselIds.concat categoryCarouselIds
    following.syncFollows ids

  initPrimaryCarousel following: following

  carouselViews = CAROUSELS.map ({ category, partners }) ->
    category = new Backbone.Model category
    partners = new Partners partners

    partners.each (partner) ->
      partner.related().profile.fetch()
      partner.related().locations.fetch()

    view = new PartnerCellCarouselView
      following: following
      category: category
      partners: partners

    view.render()

  $carousels = $('.js-partner-category-carousels')
  $carousels.html _.pluck carouselViews, '$el'

  fetchLocationCarousel(type).then ({ category, partners }) ->

    return unless partners.length > 3

    view = new PartnerCellCarouselView
      following: following
      category: category
      partners: partners

    $carousels.prepend view.render().$el

    return unless CURRENT_USER?

    following.syncFollows partners.pluck 'default_profile_id'