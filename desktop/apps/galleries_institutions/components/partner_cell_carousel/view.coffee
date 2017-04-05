_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../../../../models/profile'
PartnerCellView = require '../partner_cell/view'
FollowButtonView = require '../../../../components/follow_button/view'
ViewHelpers = require '../partner_cell/view_helpers'
template = -> require('./template.jade') arguments...
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr'

module.exports = class PartnerCellCarouselView extends Backbone.View
  className: 'partner-category-carousel'

  initialize: ({ @following }) ->

  postRender: -> _.defer =>
    initCarousel @$('.js-partner-cell-carousel'), imagesLoaded: true, advanceBy: 3, wrapAround: true
    profileIDs = @$('.js-follow-button').each((index, el) =>
      id = ($el = $(el)).attr('data-id')
      new FollowButtonView
        el: $el
        following: @following
        model: new Profile id: id
        modelName: 'profile'
        context_page: 'Galleries / Institutions page'
    )

  render: ->
    @$el.html template
      category: @model
      ViewHelpers: ViewHelpers
    @postRender()
    this


