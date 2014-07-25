_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid
    @setupHeroUnits()
    @setGenomeWorkHeights()

  setupHeroUnits: ->
    @$units = @$('.about2-hero-unit-bg')
    i = 0
    setInterval (=>
      $(@$units.removeClass('is-active').get i).addClass('is-active')
      i = (if (i + 1 < @$units.length) then i + 1 else 0)
    ), 5000


  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

  setGenomeWorkHeights: =>
    imagesLoaded '#about2-section3-genome-works', =>
      @$('.about2-section3-genome-artwork').each ->
        $(this).parent('li').height $(this).children('img').height()

module.exports.init = ->
  new AboutView el: $ 'body'