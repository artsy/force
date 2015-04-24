Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ resize } = require '../../../../components/resizer/index.coffee'
InstallShots = require '../../../../collections/install_shots.coffee'
template = -> require('./template.jade') arguments...
relatedShowsTemplate = -> require('./related_show.jade') arguments...

INSTALL_SHOT_HEIGHT = 275

module.exports = class RelatedShowsView extends Backbone.View

  className: 'show-related-shows-container'

  initialize: ( options ) ->
    @shows = options.collection
    @title = options.title
    @shows.fetch
      data: options.criteria
      success: =>
        @fetchShowImages( @shows.models[1] ).then =>
          @render()

  render: ->
    console.log '7 render'
    @$el.html template
      title: @title
      shows: @shows
    console.log 'post render'
    this

  fillRowFilter: (images) ->
    console.log '5 filtering the following images'
    console.log images
    # console.log '6 '
    # containerWidth = $('.show-related-shows-container').width() - $('.show-related-show-info').width()
    containerWidth = 890
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.get('aspect_ratio') * INSTALL_SHOT_HEIGHT
      return false if width > containerWidth or !image.get('aspect_ratio')?
      totalWidth += width
      totalWidth < containerWidth
    resizedImages = filteredImages.map (image) ->
      image.resizeUrlFor({ height: INSTALL_SHOT_HEIGHT })
    console.log '6 resized images: '
    console.log resizedImages

  fetchShowImages: (show) ->
    console.log '1 starting fetch image'
    dfd = Q.defer()
    console.log '2 setting up defer'
    Q.all([
      show.related().installShots.fetch()
      show.related().artworks.fetch()
    ]).then( =>
      console.log '3 finished fetching, it looks like this:'
      console.log show.related().installShots
      console.log show.related().artworks
      if show.related().installShots.length
        console.log '4 had install shots, about to set its install shots to resized images'
        show.related().installShots = @fillRowFilter show.related().installShots
        dfd.resolve()
      else
        console.log '4 had no install shots, moving into else and getting the right number of resized images'
        artworkImages = show.related().artworks.map (artwork) =>
          artwork.defaultImage()
        show.related().artworks = @fillRowFilter artworkImages
        dfd.resolve()
    ).done()
    dfd.promise

  # fetchShowImages: (show) =>
  #   dfd = Q.defer()
  #   show.installShots = new InstallShots
  #   show.installShots.fetch
  #     data: default: false, size: 5
  #     url: "#{sd.API_URL}/api/v1/partner_show/#{show.id}/images"
  #     error: dfd.reject
  #     success: (installShots, response, options) =>
  #       if installShots.length
  #         @$('.related-shows-children').append relatedShowsTemplate(show: show, showImages: @fillRowFilter(installShots))
  #         dfd.resolve
  #       else
  #         show.related().artworks.fetch
  #           data:
  #             size: 2
  #           error: dfd.reject
  #           success: (artworks) =>
  #             artworkImages = artworks.map (artwork) =>
  #               artwork.defaultImage()
  #             @$('.related-shows-children').append relatedShowsTemplate(show: show, showImages: @fillRowFilter(artworkImages) )
  #   dfd.promise



