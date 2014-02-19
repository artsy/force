_ = require 'underscore'
Backbone = require 'backbone'
JumpView = require '../../jump/view.coffee'

module.exports = class FilterFixedHeader extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @mainHeaderHeight = $('#main-layout-header').height()
    @document = document.documentElement
    @$window = $ window
    @$window.on 'scroll', @popLock
    @params.on 'change:price_range change:dimension change:medium change:sort', @scrollToTop
    @wrap()
    @setupJump()

  scrollToTop: =>
    return unless @$window.scrollTop() > @$el.offset().top
    @document.scrollTop = @$el.offset().top + 60 - @mainHeaderHeight

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

  events:
    'click .filter-button, .filter-dropdown a': 'renderActive'

  renderActive: (e) ->
    @$('.filter-button, .filter-dropdown a, .filter-dropdown').removeClass('is-active')
    $(e.currentTarget).addClass('is-active')
    @renderActiveParams()

  renderActiveParams: =>
    for attr in @params.keys()
      continue unless ($a = @$("a[data-attr='#{attr}'][data-val='#{@params.get(attr)}']")).length
      $a.addClass('is-active')
        .closest('.filter-dropdown')
        .addClass('is-active')
        .children('.filter-nav-active-text')
        .text $a.children('.filter-dropdown-text').text()