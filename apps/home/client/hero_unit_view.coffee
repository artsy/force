Backbone = require 'backbone'
_ = require 'underscore'

module.exports = class HeroUnitView extends Backbone.View

  initialize: ->
    @$window = $ window
    @$mainHeader = @$('#main-layout-header')
    @$heroUnits = @$('#home-hero-units')
    @setBodyClass()
    @setInterval()
    @$window.on 'scroll', _.throttle @setBodyClass, 100
    @$window.on 'keyup', (e) => @onKeyUp(e) 

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
    'click #home-hero-units-left-arrow'   : 'onLeftArrow'
    'click #home-hero-units-right-arrow'  : 'onRightArrow'
    'click #home-hero-unit-dots li'       : 'onDot'
    'touchstart #home-hero-units'         : 'swipeStart'
    'touchend #home-hero-units'           : 'swipeEnd'

  clearIntervalAndRemoveTransition: ->
    clearInterval @interval
    props = {}
    _.each ['-webkit-', '-moz-', '-o-', '-ms-', ''], (value) =>
      props[value + "transition-duration"] = '0s'
    @$heroUnits.css props

  initIntervalAndTransition: ->
    props = {}
    _.each ['-webkit-', '-moz-', '-o-', '-ms-', ''], (value) =>
      props[value + "transition-duration"] = '0.2s'   # TODO: this value is currently defined in the Hero Unit CSS as well
    @$heroUnits.css props
    @setInterval()

  initSwipeVars: ->
    @isSwiping = @isDoneSwiping = @nextHero = false

  swipeStart: (e) ->
    e.preventDefault()
    pointerOrigleft = e.originalEvent.touches[0]?.pageX or e.pageX
    @clearIntervalAndRemoveTransition()
    @initSwipeVars()
    @$('.home-hero-unit.home-hero-unit-active').on("touchmove", _.throttle((e) =>
      return if @isDoneSwiping
      @isSwiping = true
      currentPointerLeft = e.originalEvent.touches[0]?.pageX or e.pageX

      # Get next hero unit based on swipe direction
      unless @nextHero
        if currentPointerLeft < pointerOrigleft # swiping to the left
          @nextHero = @$('.home-hero-unit.home-hero-unit-active').next()
          @nextHero = @$('.home-hero-unit').first() unless @nextHero.length
          @swipedLeft = true
        else if currentPointerLeft > pointerOrigleft
          @nextHero = @$('.home-hero-unit.home-hero-unit-active').prev()
          @nextHero = @$('.home-hero-unit').last() unless @nextHero.length
          @swipedLeft = false

        # Make that next hero unit visible
        @nextHero.addClass('home-hero-unit-pseudo-active') if @nextHero

      # How much to move the current hero unit by (following the swipe)
      moveLeft = currentPointerLeft - pointerOrigleft
      @$('.home-hero-unit.home-hero-unit-active').css('left', moveLeft + 'px')
    , 30) )

  swipeEnd: (e) ->
    wasSwiping = @isSwiping
    @isSwiping = false
    @isDoneSwiping = true
    $('.home-hero-unit.home-hero-unit-active').unbind('touchmove')
    return unless wasSwiping
    left = $('.home-hero-unit.home-hero-unit-active').offset().left

    # If swiped more than half of the hero unit pick the next one
    if @swipedLeft
      if Math.abs(left) > @$window.width() / 2
        $nextHeroUnit = @$('.home-hero-unit.home-hero-unit-active').next()
        $nextHeroUnit = @$('.home-hero-unit').first() unless $nextHeroUnit.length
    else
      if left > @$window.width() / 2
        $nextHeroUnit = @$('.home-hero-unit.home-hero-unit-active').prev()
        $nextHeroUnit = @$('.home-hero-unit').last() unless $nextHeroUnit.length

    # Reset position of active unit
    @$('.home-hero-unit.home-hero-unit-active').css('left', '0px')
    @$('.home-hero-unit.home-hero-unit-pseudo-active').removeClass('home-hero-unit-pseudo-active')
    # If swiped far enough, select the next Hero and dot
    if $nextHeroUnit
      @$('.home-hero-unit.home-hero-unit-active').removeClass('home-hero-unit-active')
      idx = @$('#home-hero-units li').index($nextHeroUnit)
      @$("#home-hero-unit-dots li").removeClass 'hhud-active'
      @$("#home-hero-unit-dots li").eq(idx).addClass 'hhud-active'
      $nextHeroUnit.addClass('home-hero-unit-active')
    @initIntervalAndTransition()

  onKeyUp: (e) ->
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