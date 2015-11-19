_ = require 'underscore'
Backbone = require 'backbone'
{ CAROUSELS, CURRENT_USER } = require('sharify').data
Partners = require '../../../collections/partners.coffee'
{ Following } = require '../../../components/follow_button/index.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'
fetchLocationCarousel = require '../components/location_carousel/index.coffee'
PartnerCellCarouselView = require '../components/partner_cell_carousel/view.coffee'

module.exports.init = ->
  if CURRENT_USER?
    following = new Following [], kind: 'profile'
    partners = _.flatten _.pluck CAROUSELS, 'partners'
    ids = _.pluck partners, 'default_profile_id'
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

  fetchLocationCarousel().then ({ category, partners }) ->
    view = new PartnerCellCarouselView
      following: following
      category: category
      partners: partners

    $carousels.prepend view.render().$el

    return unless CURRENT_USER?

    following.syncFollows partners.pluck 'default_profile_id'
