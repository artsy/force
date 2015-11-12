{ CURRENT_USER } = require('sharify').data
PartnerCellCarousel = require '../components/partner_cell_carousel/view.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
Profile = require '../../../models/profile.coffee'
PartnerCell = require '../components/partner_cell/view.coffee'

module.exports.init = ->

  initPrimaryCarousel()

  @carousels = $('.partner-category-carousel').map ->
    carousel = new PartnerCellCarousel
      el: this
    carousel.setupCarousel()

  following = new Following([], kind: 'profile') if CURRENT_USER?

  followIds = $('.partner-cell').map ->
    id = $(this).data 'id'

    profile = new Profile id: id

    cell = new PartnerCell
      model: profile
      el: this

    cell.fetchMetadata()

    new FollowButton
      following: following
      modelName: 'profile'
      model: profile
      el: cell.$('.follow-button')
    id

  following?.syncFollows followIds

