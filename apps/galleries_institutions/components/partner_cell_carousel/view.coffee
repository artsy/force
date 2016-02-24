_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../../../../models/profile.coffee'
PartnerCellView = require '../partner_cell/view.coffee'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
ViewHelpers = require '../partner_cell/view_helpers.coffee'
template = -> require('./template.jade') arguments...

module.exports = class PartnerCellCarouselView extends Backbone.View
  className: 'partner-category-carousel'
  cellsPerRow: 3
  subViews: []

  events:
    'click .js-pcc-prev': 'prev'
    'click .js-pcc-next': 'next'

  initialize: ({ @following }) -> #

  next: (e) ->
    @flickity.select @flickity.selectedIndex + @cellsPerRow

  prev: (e) ->
    @flickity.select @flickity.selectedIndex - @cellsPerRow

  setupFlickity: ->
    Flickity = require 'flickity'
    @flickity = new Flickity @$('.js-partner-cells')[0],
      cellAlign: 'left'
      prevNextButtons: false
      pageDots: false
      wrapAround: true

  postRender: -> _.defer =>
    @setupFlickity()
    profileIDs = @$('.js-follow-button').each((index, el) =>
      id = ($el = $(el)).attr('data-id')
      new FollowButtonView
        el: $el
        following: @following
        model: new Profile id: id
        modelName: 'profile'
    )

  render: ->
    @$el.html template
      category: @model
      ViewHelpers: ViewHelpers
    @postRender()
    this

  remove: ->
    @flickity?.destroy()
    super

