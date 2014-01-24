Backbone = require 'backbone'

module.exports = class HeroUnitView extends Backbone.View

  el: '#home-hero-units-container'

  initialize: (options) ->
    { @$body } = options
    @setBodyClass()
    @setInterval()

  setInterval: ->
    clearInterval @interval
    @interval = setInterval @nextHeroUnit, 8000

  setBodyClass: ->
    # TODO: Toggle this based on whether the user scrolled past the hero unit.
    if true
      $activeLi = @$('> li.home-hero-unit-active')
      @$body.addClass if $activeLi.hasClass('home-hero-unit-white')
                        'body-transparent-header'
                      else
                        'body-transparent-header-white'
    else
      @$body.removeClass 'body-transparent-header body-transparent-header-white'

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
    $('.home-hero-unit').eq(index).addClass('home-hero-unit-active')
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