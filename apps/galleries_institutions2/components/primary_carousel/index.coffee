_ = require 'underscore'
initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = ->
  { cells } = initCarousel $('.js-galleries-primary-carousel')
  { flickity } = cells

  $overlays = $('.js-gpc-overlay')
  $overlays.first().show()

  flickity.on 'cellSelect', ->
    $overlays.hide().attr 'data-state', 'inactive'
    $selected = $($overlays[flickity.selectedIndex])
    $selected.show()
    _.defer ->
      $selected.attr 'data-state', 'active'

  $('.js-gpc-next').on 'click', ->
    flickity.next()

  $('.js-gpc-prev').on 'click', ->
    flickity.previous()
