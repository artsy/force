Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = class PartnerCellCarousel extends Backbone.View
  events:
    'click .partner-cell-carousel-arrow-right': 'next'
    'click .partner-cell-carousel-arrow-left': 'prev'

  initialize: ->
    @cellsPerRow = 3

  setupCarousel: ->
    @flickity = initCarousel(@$('.partner-cell-carousel-content'), wrapAround: true).cells.flickity
    @leftButton = @$('.js-carousel-arrow-left')
    @rightButton = @$('.js-carousel-arrow-right')

  next: ->
    @flickity.next true

  prev: ->
    @flickity.previous true
