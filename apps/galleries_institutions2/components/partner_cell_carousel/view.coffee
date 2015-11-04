Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
{ CURRENT_USER } = require('sharify').data
PartnerCell = require '../partner_cell/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profile = require '../../../../models/profile.coffee'
initCarousel = require '../../../../components/merry_go_round/index.coffee'

module.exports = class PartnerCellCarousel extends Backbone.View
  events:
    'click .partner-cell-carousel-arrow-right': 'next'
    'click .partner-cell-carousel-arrow-left': 'prev'

  initialize: ({@partners}) ->
    @cellsPerRow = 3

  setupFollowing: ->
    @following = new Following([], kind: 'profile') if CURRENT_USER?
    profileIds = partners.pluck('default_profile_id')
    @following?.syncFollows profileIds

  renderCells: ->
    @cells = @$('.partner-cell').map (i, el) =>
      id = ($el = $(el)).data 'id'
      cell = new PartnerCell
        model: @partners.get(id)
        following: @following
        el: el
      cell.fetchMetadata()
      cell
    this

  setupCarousel: ->
    @flickity = initCarousel(@$('.partner-cell-carousel-content'), wrapAround: false).cells.flickity
    @flickity.on('cellSelect', @cellIndexChanged)
    @leftButton = @$('.js-carousel-arrow-left')
    @rightButton = @$('.js-carousel-arrow-right')

  isFirstCell: ->
    @flickity.selectedIndex is 0

  isLastCell: ->
    @flickity.selectedIndex is @flickity.cells.length - @cellsPerRow

  next: ->
    return if @isLastCell()
    @flickity.next false

  prev: ->
    return if @isFirstCell()
    @flickity.previous false

  cellIndexChanged: =>
    if @isFirstCell()
      @leftButton.fadeOut()
    else
      @leftButton.fadeIn()

    if @isLastCell()
      @rightButton.fadeOut()
    else
      @rightButton.fadeIn()
