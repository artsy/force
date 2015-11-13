initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = (el) ->
  cellsPerRow = 3

  { cells } = initCarousel $el = $(el), wrapAround: true
  { flickity } = cells

  $el.find('.partner-cell-carousel-arrow-right').on 'click', ->
    flickity.next()

  $el.find('.partner-cell-carousel-arrow-left').on 'click', ->
    flickity.previous()

