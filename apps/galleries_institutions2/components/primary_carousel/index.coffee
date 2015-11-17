_ = require 'underscore'
initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = ->
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
