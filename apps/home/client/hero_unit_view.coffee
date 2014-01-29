Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class HeroUnitView extends Backbone.View

  initialize: ->
    @$window = $ window
    @$mainHeader = @$('#main-layout-header')
    @$heroUnits = @$('#home-hero-units')
    @setBodyClass()
    @setInterval()
    @$window .on 'scroll', _.throttle @setBodyClass, 100

  setInterval: ->
    clearInterval @interval
    @interval = setInterval @nextHeroUnit, 8000

  setBodyClass: =>
    if @$window.scrollTop() + @$mainHeader.height() <= @$heroUnits.height()
      $activeLi = @$('.home-hero-unit.home-hero-unit-active')
      if $activeLi.hasClass('home-hero-unit-white')
        @$el.removeClass('body-transparent-header-white').addClass 'body-transparent-header'
      else
        @$el.removeClass('body-transparent-header').addClass 'body-transparent-header-white'
    else
      @$el.removeClass 'body-transparent-header body-transparent-header-white'

  nextHeroUnit: (direction = 1) =>
    if direction is 1
      $next = @$('.home-hero-unit.home-hero-unit-active').next()
      $next = @$('.home-hero-unit').first() unless $next.length
    else
      $next = @$('.home-hero-unit.home-hero-unit-active').prev()
      $next = @$('.home-hero-unit').last() unless $next.length
    @showHeroUnit $next.index()

  showHeroUnit: (index) ->
    @$('.home-hero-unit').removeClass('home-hero-unit-active')
    @$('.home-hero-unit').eq(index).addClass('home-hero-unit-active')
    @$("#home-hero-unit-dots li").removeClass 'hhud-active'
    @$("#home-hero-unit-dots li").eq(index).addClass('hhud-active')
    @setBodyClass()

  events:
    'click #home-hero-units-left-arrow': 'onLeftArrow'
    'click #home-hero-units-right-arrow': 'onRightArrow'
    'click #home-hero-unit-dots li': 'onDot'

  onLeftArrow: ->
    @setInterval()
    @nextHeroUnit -1

  onRightArrow: ->
    @setInterval()
    @nextHeroUnit()

  onDot: (e) ->
    @showHeroUnit $(e.target).index()