_ = require 'underscore'
Backbone = require 'backbone'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'resize', _.debounce @setupHero
    @$window.on 'keyup', @toggleGrid
    @setupHero()

  setupHero: =>
    @$('#about2-hero-unit').height @$window.height()
    @$('#about2-hero-unit-container').css(
      top: "calc(50% - #{@$('#about2-hero-unit-container').height() / 2}px)"
    )

  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

module.exports.init = ->
  new AboutView el: $ 'body'