sd = require('sharify').data
PartnerCellCarousel = require '../components/partner_cell_carousel/view.coffee'
Partner = require '../../../models/partner.coffee'
# Partners = require '../../../collections/partners.coffee'
PartnerCategories = require '../../../collections/partner_categories.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'

module.exports.init = ->
  initPrimaryCarousel()

  @carousels = $('.partner-category-carousel').map ->
    carousel = new PartnerCellCarousel
      el: this
    carousel.renderCells()
    carousel.setupCarousel()

  # following = new Following([], kind: 'profile') if CURRENT_USER?
  # console.log following
  # followIds = $('.follow-button').map ->
  #   id = ($el = $(this)).data 'id'
  #   console.log this, id
  #   new FollowButton
  #     following: following
  #     modelName: 'profile'
  #     model: new Profile id: id
  #     el: $el
  #   id

  # console.log followIds

  # following?.syncFollows followIds.get()
