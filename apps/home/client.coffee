Backbone = require 'backbone'

module.exports.HeroUnitView = class HeroUnitView extends Backbone.View

  el: '#home-hero-units'

  initialize: (options) ->
    { @$body } = options
    @setBodyClass()
    @interval = setInterval @nextHeroUnit, 8000

  setBodyClass: ->
    if true
      $activeLi = @$('> li.home-hero-unit-active')
      @$body.addClass if $activeLi.hasClass('home-hero-unit-white')
                        'body-transparent-header'
                      else
                        'body-transparent-header-white'
    else
      @$body.removeClass 'body-transparent-header body-transparent-header-white'

  nextHeroUnit: =>
    $next = @$('> li.home-hero-unit-active').next()
    $next = @$('> li').first() unless $next.length
    @$('li').removeClass('home-hero-unit-active')
    $next.addClass('home-hero-unit-active')
    @setBodyClass()

module.exports.init = ->
  window.view = new HeroUnitView $body: $('body')