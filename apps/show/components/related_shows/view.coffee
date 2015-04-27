Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../../components/resizer/index.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
template = -> require('./template.jade') arguments...

SHOW_INFO_WIDTH = 320

module.exports = class RelatedShowsView extends Backbone.View

  className: 'show-related-shows-container'

  initialize: ( options ) ->
    @title = options.title
    @shows = options.collection
    @listenTo @shows, 'sync', @getShowsImages

  getShowsImages: ->
    Q.allSettled(@shows.models.map (show) =>
       show.fetchRelatedImages()
    ).then( =>
      window.testShow = @shows.models[1]
      @shows.models.map (show) =>
        show.related().relatedImages = @fillRowFilter show.related().relatedImages
      @render()
    )

  render: ->
    @$el.html template
      title: @title
      shows: @shows.models
    this

  fillRowFilter: (images) ->
    containerWidth = $('.main-layout-container').width() - SHOW_INFO_WIDTH
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.get('aspect_ratio') * SHOW_INFO_WIDTH
      return false if width > containerWidth or !image.get('aspect_ratio')?
      totalWidth += width
      totalWidth < containerWidth
    resizedImages = filteredImages.map (image) ->
      image.resizeUrlFor({ height: SHOW_INFO_WIDTH })
