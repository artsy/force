_ = require 'underscore'
{ MAIN_PROFILES } = require('sharify').data
Profiles = require '../../../../collections/profiles.coffee'
initCarousel = require '../../../../components/merry_go_round/index.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'

module.exports = ({ following }) ->
  $el = $('.js-galleries-primary-carousel')

  { cells } = initCarousel $el, wrapAround: true
  { flickity } = cells

  $overlays = $el.find('.js-gpc-overlay')
  $dots = $el.find('.js-gpc-dot')

  $overlays.first().fadeIn()

  $dots.on 'click', (e) ->
    e.preventDefault()
    i = $(this).data 'index'
    flickity.select i

  flickity.on 'cellSelect', ->
    $dots.removeClass 'is-active'
    $($dots[flickity.selectedIndex])
      .addClass 'is-active'

    $overlays.fadeOut()
    $overlays.promise().done ->
      $selected = $($overlays[flickity.selectedIndex])
      $selected.fadeIn()

  $el.find('.js-gpc-next').on 'click', ->
    flickity.next()

  $el.find('.js-gpc-prev').on 'click', ->
    flickity.previous()

  (profiles = new Profiles MAIN_PROFILES)
    .map (profile) ->
      new FollowButtonView
        el: $el.find(".js-follow-button[data-id='#{profile.id}']")
        following: following
        model: profile
        modelName: 'profile'
