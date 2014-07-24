_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid
    @setGenomeWorkHeights()

  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

  setGenomeWorkHeights: =>
    imagesLoaded '#about2-section3-genome-works', =>
      @$('.about2-section3-genome-artwork').each ->
        $(this).parent('li').height $(this).children('img').height()

module.exports.init = ->
  new AboutView el: $ 'body'