_ = require 'underscore'
Backbone = require 'backbone'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'resize', _.debounce @setupHero
    @setupHero()

  setupHero: =>
    @$('#about2-hero-unit').height @$window.height()
    @$('#about2-hero-unit-container').css(
      "margin-top": -(@$('#about2-hero-unit-container').height() / 2)
      top: '50%'
    )

module.exports.init = ->
  new AboutView el: $ 'body'