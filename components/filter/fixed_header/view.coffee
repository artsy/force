_ = require 'underscore'
Backbone = require 'backbone'
JumpView = require '../../jump/view.coffee'

module.exports = class FilterFixedHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @$bodyHtml = $('body, html')
    @$window = $ window
    @mainHeaderHeight = $('#main-layout-header').height()
    @$window.on 'scroll', @popLock
    @params.on 'change', @scrollToTop
    @wrap()
    @setupJump()

  scrollToTop: =>
    return unless @$window.scrollTop() > @$el.offset().top
    return if @params.changedAttributes() and _.isEqual(_.keys(@params.changedAttributes()), ['page'])
    @$bodyHtml.scrollTop @$el.offset().top + 60 - @mainHeaderHeight

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