_ = require 'underscore'
Backbone = require 'backbone'
FillwidthView = require '../../fillwidth_row/view.coffee'
initCarousel = require '../../merry_go_round/index.coffee'
template = -> require('../templates/artwork_rail.jade') arguments...

module.exports = class ArtworkRailView extends Backbone.View
  className: 'arv-container'

  initialize: ({ @title, @viewAllUrl })->
    @collection.on 'sync', @render, @

  render: ->
    if @collection.length
      @$el.html template
        artworks: @collection.models
        title: @title
        viewAllUrl: @viewAllUrl
        imageHeight: 250

      _.defer => @postRender()

  postRender: ->
    initCarousel $('.js-my-carousel'), imagesLoaded: true
