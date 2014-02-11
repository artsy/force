_ = require 'underscore'
Backbone = require 'backbone'
JumpView = require '../../jump/view.coffee'

module.exports = class FilterFixedHeader extends Backbone.View

  initialize: (options) ->
    @$window = $ window
    @$window.on 'scroll', @popLock
    @wrap()
    @setupJump()

  setupJump: ->
    @jump = new JumpView threshold: @$window.height()
    @$el.append @jump.$el.addClass 'jump-from-bottom'

  wrap: =>
    @$el.wrap "<div class='filter-fixed-header-container'>"
    @setElement @$el.parent()
    @$el.height @$el.height()

  popLock: =>
    if @$window.scrollTop() > @$el.offset().top
      @$el.addClass('filter-fixed-header')
    else
      @$el.removeClass('filter-fixed-header')