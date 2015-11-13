Flickity = require 'flickity'

module.exports = (el) ->
  cellsPerRow = 3

  $el = $(el)
  flickity = new Flickity $el.find('.partner-cell-carousel-content')[0],
    cellAlign: 'left'
    prevNextButtons: false
    pageDots: false
    wrapAround: true

  $el.find('.partner-cell-carousel-arrow-right').on 'click', ->
    flickity.select(flickity.selectedIndex + cellsPerRow)

  $el.find('.partner-cell-carousel-arrow-left').on 'click', ->
    flickity.select(flickity.selectedIndex - cellsPerRow)