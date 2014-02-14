_ = require 'underscore'
Backbone = require 'backbone'
JumpView = require '../../jump/view.coffee'

module.exports = class FilterFixedHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @$mainHeader = $('#main-layout-header')
    @document = document.documentElement
    @$window = $ window
    @$window.on 'scroll', @popLock
    @params.on 'change:price_range change:dimension change:medium change:sort', @scrollToTop
    @wrap()
    @setupJump()

  scrollToTop: =>
    return unless @$window.scrollTop() > @$el.offset().top
    @document.scrollTop = @$el.offset().top + @$el.height() - (@$mainHeader.height() / 2)

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