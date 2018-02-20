_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class AvantGardeTabsView extends Backbone.View
  events:
    'click .avant-garde-tabs__tab': 'toggleSection'

  initialize: ->
    @$tabCursor = @$('#avant-garde-tabs__cursor')
    @moveCursor()

  moveCursor: ->
    @$active = @$('.avant-garde-tabs__tab--active')
    @$tabCursor.animate
      width: @$active.outerWidth()
      left: @$active.position()?.left
    , 150

  toggleSection: (e) ->
    @$('.avant-garde-tabs__tab--active').removeClass 'avant-garde-tabs__tab--active'
    tab = $(e.currentTarget).addClass('avant-garde-tabs__tab--active').data 'tab'
    @$('.avant-garde-tabs-list--active').removeClass 'avant-garde-tabs-list--active'
    @$(".avant-garde-tabs-list[data-list='#{tab}']").addClass 'avant-garde-tabs-list--active'
    _.defer =>
      @moveCursor()
