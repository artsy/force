_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'resize', _.debounce @setupHero
    @$window.on 'keyup', @toggleGrid
    @setupHero()
    @setGenomeWorkHeights()

  setupHero: =>
    @$('#about2-hero-unit').height @$window.height()
    @$('#about2-hero-unit-container').css(
      top: "calc(50% - #{@$('#about2-hero-unit-container').height() / 2}px)"
    )

  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

  setGenomeWorkHeights: =>
    imagesLoaded '#about2-section3-genome-works', =>
      @$('.about2-section3-genome-artwork').each ->
        $(this).parent('li').height $(this).children('img').height()

module.exports.init = ->
  new AboutView el: $ 'body'