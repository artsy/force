_ = require 'underscore'
Backbone = require 'backbone'
PartnerCellView = require '../partner_cell/view.coffee'
template = -> require('./template.jade') arguments...

module.exports = class PartnerCellCarouselView extends Backbone.View
  className: 'partner-category-carousel'

  cellsPerRow: 3
  subViews: []

  events:
    'click .js-pcc-prev': 'prev'
    'click .js-pcc-next': 'next'

  initialize: ({ @following, @category, @partners }) -> #

  next: (e) ->
    @flickity.select @flickity.selectedIndex + @cellsPerRow

  prev: (e) ->
    @flickity.select @flickity.selectedIndex - @cellsPerRow

  setupFlickity: -> _.defer =>
    Flickity = require 'flickity'
    @flickity = new Flickity @$('.js-partner-cells')[0],
      cellAlign: 'left'
      prevNextButtons: false
      pageDots: false
      wrapAround: true

  postRender: ->
    @subViews = @partners.map (partner) =>
      view = new PartnerCellView partner: partner, following: @following
      view.render()

    @$('.js-partner-cells').html _.pluck @subViews, '$el'

    @setupFlickity()

  render: ->
    @$el.html template
      category: @category
      partners: @partners.models
    @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    @flickity?.destroy()
    super
