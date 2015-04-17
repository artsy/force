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
    @render()

  postrender: ->
    for show in @shows.models
      @fetchShowImages(show)

  render: -> 
    @$el.html template
      title: @title
    @postrender() 
    this

  fillRowFilter: (images) ->
    containerWidth = $('.show-related-shows-container').width() - INSTALL_SHOT_HEIGHT
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.get('aspect_ratio') * INSTALL_SHOT_HEIGHT
      return false if width > containerWidth or !image.get('aspect_ratio')?
      totalWidth += width
      totalWidth < containerWidth
    resizedImages = filteredImages.map (image) ->
      resize(image.get('image_urls')['large'], {height: INSTALL_SHOT_HEIGHT})

  fetchShowImages: (show) =>
    dfd = Q.defer()
    show.installShots = new InstallShots
    show.installShots.fetch
      cache: @cache
      data: default: false, size: 5
      url: "#{sd.API_URL}/api/v1/partner_show/#{show.id}/images"
      error: dfd.reject
      success: (installShots, response, options) =>
        if installShots.length
          @$('.related-shows-children').append relatedShowsTemplate(show: show, showImages: @fillRowFilter(installShots))
          dfd.resolve 
        else
          show.related().artworks.fetch
            data:
              size: 2
            error: dfd.reject  
            success: (artworks) =>
              artworkImages = artworks.map (artwork) =>
                artwork.defaultImage()
              @$('.related-shows-children').append relatedShowsTemplate(show: show, showImages: @fillRowFilter(artworkImages) ) 
    dfd.promise