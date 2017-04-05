_ = require 'underscore'
Backbone = require 'backbone'
JumpView = require '../../jump/view'

module.exports = class FilterFixedHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @$bodyHtml = $('body, html')
    @$window = $ window

    # Sometimes we get incorrect measurements from
    # $('#main-layout-header').height() on fair pages so this is fixed
    @mainHeaderHeight = 64
    @$window.on 'scroll', @popLock
    @$window.on 'resize', _.throttle(@squeeze, 100)
    @params.on 'change', @scrollToTop
    @wrap()
    @setupJump()

  scrollToTop: =>
    return unless @$window.scrollTop() > @$el.offset().top
    return if @params.changedAttributes() and _.isEqual(_.keys(@params.changedAttributes()), ['page'])
    @$bodyHtml.scrollTop @$el.offset().top + 60 - @mainHeaderHeight

  setupJump: ->
    @jump = new JumpView direction: 'bottom', threshold: @$window.height()
    @$el.append @jump.$el

  wrap: =>
    @$el.wrap "<div class='filter-fixed-header-container'>"
    @setElement @$el.parent()
    @$el.height @$el.height()

  popLock: =>
    if @$window.scrollTop() > @$el.offset().top
      @$el.addClass('filter-fixed-header'); @squeeze()
    else
      @$el.removeClass('filter-fixed-header')

  squeeze: =>
    $squeezee = @$('.filter-fixed-header-left')
    $squeezer = @$('.filter-fixed-header-nav').children().not($squeezee)
    return unless $squeezer.length and $squeezee.length
    left = $squeezee.offset().left + $squeezee.width()
    right = _.min( _.map($squeezer, (e) -> $(e).offset().left) )
    $squeezee.css(visibility: "hidden") if left > right
    $squeezee.css(visibility: "visible") if right > left
