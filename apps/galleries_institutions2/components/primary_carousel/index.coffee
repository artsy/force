_ = require 'underscore'
{ MAIN_PROFILES } = require('sharify').data
Profiles = require '../../../../collections/profiles.coffee'
initCarousel = require '../../../../components/merry_go_round/index.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'

module.exports = ({ following }) ->
  { cells } = initCarousel $('.js-galleries-primary-carousel')
  { flickity } = cells

  $overlays = $('.js-gpc-overlay')
  $overlays.first().fadeIn()

  flickity.on 'cellSelect', ->
    $overlays.fadeOut()
    $overlays.promise().done ->
      $selected = $($overlays[flickity.selectedIndex])
      $selected.fadeIn()

  $('.js-gpc-next').on 'click', ->
    flickity.next()

  $('.js-gpc-prev').on 'click', ->
    flickity.previous()

  (profiles = new Profiles MAIN_PROFILES)
    .map (profile) ->
      new FollowButtonView
        el: $(".js-follow-button[data-id='#{profile.id}']")
        following: following
        model: profile
        modelName: 'profile'
