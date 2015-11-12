Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
{ CURRENT_USER } = require('sharify').data
PartnerCell = require '../partner_cell/view.coffee'
Profile = require '../../../../models/profile.coffee'
Partner = require '../../../../models/partner.coffee'
initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = class PartnerCellCarousel extends Backbone.View
  events:
    'click .partner-cell-carousel-arrow-right': 'next'
    'click .partner-cell-carousel-arrow-left': 'prev'

  initialize: ->
    @cellsPerRow = 3

  renderCells: ->
    @cells = @$('.partner-cell').map ->
      id = ($el = $(this)).data 'id'
      cell = new PartnerCell
        model: new Profile id: id
        el: this
      cell.fetchMetadata()
      cell
    this

  setupCarousel: ->
    @flickity = initCarousel(@$('.partner-cell-carousel-content'), wrapAround: true).cells.flickity
    @leftButton = @$('.js-carousel-arrow-left')
    @rightButton = @$('.js-carousel-arrow-right')

  next: ->
    @flickity.next true

  prev: ->
    @flickity.previous true
