sd = require('sharify').data
PartnerCellCarousel = require '../components/partner_cell_carousel/view.coffee'
Partner = require '../../../models/partner.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'
{ FollowButton } = require '../../../components/follow_button/index.coffee'
Profile = require '../../../models/profile.coffee'

module.exports.init = ->
  initPrimaryCarousel()

  @carousels = $('.partner-category-carousel').map ->
    carousel = new PartnerCellCarousel
      el: this
    carousel.renderCells()
    carousel.setupCarousel()

  following = new Following([], kind: 'profile') if CURRENT_USER?
  followIds = $('.follow-button').map ->
    id = ($el = $(this)).data 'id'
    new FollowButton
      following: following
      modelName: 'profile'
      model: new Profile id: id
      el: $el
    id

  following?.syncFollows followIds.get()
