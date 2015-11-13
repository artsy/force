{ CURRENT_USER } = require('sharify').data
initPartnerCarousel = require '../components/partner_cell_carousel/index.coffee'
initPrimaryCarousel = require '../components/primary_carousel/index.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
Profile = require '../../../models/profile.coffee'
PartnerCell = require '../components/partner_cell/view.coffee'

module.exports.init = ->

  initPrimaryCarousel()

  $('.partner-category-carousel').map ->
    initPartnerCarousel(this)

  following = new Following([], kind: 'profile') if CURRENT_USER?

  followIds = $('.partner-cell').map ->
    id = ($el = $(this)).data 'id'
    profile = new Profile id: id

    cell = new PartnerCell
      model: profile

    cell.fetch().then ->
      $el.html cell.render().$el

    .then ->
      new FollowButton
        following: following
        modelName: 'profile'
        model: profile
        el: $el.find('.follow-button')

    id

  following?.syncFollows followIds

