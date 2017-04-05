_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'
Flickity = require 'flickity'
carouselTemplate = -> require('../templates/sections/slideshow/carousel.jade') arguments...

module.exports = ->
  $('.article-section-slideshow').each ->
    allItems = ($el = $(this)).data 'items'
    artworkIds = _.pluck _.where(allItems, type: 'artwork'), 'id'
    artworks = new Artworks _.map artworkIds, (id) -> id: id
    images = _.where allItems, type: 'image'
    figures = new Backbone.Collection

    prepareFigures = _.after artworks.length, ->
      figures.reset artworks.map((artwork) ->
        new Backbone.Model
          url: artwork.defaultImageUrl('large')
          caption: artwork.get('title')
      ).concat _.map images, (image) ->
        new Backbone.Model image
      renderCarouselTemplate()

    renderCarouselTemplate = ->
      $el.html carouselTemplate(figures: figures)
      _.defer => attachFlickity()

    attachFlickity = ->
      @slideshow = new Flickity '#carousel-track',
        cellAlign: 'left'
        contain: true
        prevNextButtons: false
        wrapAround: false
        imagesLoaded: true
        pageDots: false

    artworks.invoke 'fetch',
      complete: prepareFigures
      # Artworks frequently become unpublished
      error: (model, response, options) ->
        artworks.remove model
