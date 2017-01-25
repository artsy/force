_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
mediator = require '../../../lib/mediator.coffee'

module.exports = class HeroUnitView extends Backbone.View
  pauseLength: 8000

  events:
    'click #home-hero-units-left-arrow': 'onLeftArrow'
    'click #home-hero-units-right-arrow': 'onRightArrow'
    'click .hhu-dot': 'onDot'
    'click .home-hero-unit-welcome': 'signUp'

  initialize: ->
    @$window = $(window)
    @$mainHeader = @$('#main-layout-header')
    @$heroUnitsContainer = @$('#home-hero-units')
    @$heroUnits = @$('.home-hero-unit')

    @setBodyClass()
    @initInterval()

    @$window.on 'scroll', _.throttle @setBodyClass, 100
    @$window.on 'keyup', (e) => @onKeyUp(e)

    @$heroUnitsContainer.imagesLoaded @setRetinaHeroTitles

  setRetinaHeroTitles: =>
    @$('.hhu-title').each ->
      $(this)
        .height($(this).height())
        .attr 'src', $(this).attr('data-retina')

  initInterval: ->
    if (@$heroUnits.first().data('type') is 'welcome') then @setInterval else _.delay(@setInterval, @pauseLength)

  setInterval: =>
    clearInterval @interval
    @interval = setInterval @nextHeroUnit, @pauseLength

  setBodyClass: =>
    if @$window.scrollTop() + @$mainHeader.height() <= @$heroUnitsContainer.height()
      if @$('.home-hero-unit-active').attr('class').match('-light')
        @$el.removeClass('body-transparent-header').addClass 'body-transparent-header-white'
      else
        @$el.removeClass('body-transparent-header-white').addClass 'body-transparent-header'
    else
      @$el.removeClass 'body-transparent-header body-transparent-header-white'

  nextHeroUnit: (direction = 1) =>
    if direction is 1
      $next = @$('.home-hero-unit-active').next()
      $next = @$heroUnits.first() unless $next.length
    else
      $next = @$('.home-hero-unit-active').prev()
      $next = @$heroUnits.last() unless $next.length
    @showHeroUnit $next.index()

  showHeroUnit: (index) ->
    @$('.home-hero-unit')
      .removeClass('home-hero-unit-active')
      .eq(index)
      .addClass('home-hero-unit-active')
    @$('.hhu-dot')
      .removeClass('hhud-active')
      .eq(index)
      .addClass('hhud-active')
    @setBodyClass()

  onKeyUp: (e) ->
    return if $(e.target).attr('id') is 'main-layout-search-bar-input'
    switch e.keyCode
      when 37
        @onLeftArrow()
      when 39
        @onRightArrow()
    false

  onLeftArrow: ->
    @setInterval()
    @nextHeroUnit -1

  onRightArrow: ->
    @setInterval()
    @nextHeroUnit()

  onDot: (e) ->
    @showHeroUnit $(e.target).index()

  signUp: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'signup'
