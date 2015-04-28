Q = require 'q'
_ = require 'underscore'
Backbone = require 'Backbone'

module.exports = class PartnerShowRelatedImages extends Backbone.Collection
  initialize: (models, options) ->
    @show = options.show
    @containerWidth = options.containerWidth
    @showInfoWidth = options.showInfoWidth
    super

  fetch: ->
    Q.all([
      @show.related().installShots.fetch data: size: 5
      @show.related().artworks.fetch data: size: 5
    ]).then () =>
      filteredImages = @fillRowFilter (@show.related().installShots.models.concat @show.related().artworks.invoke('defaultImage'))
      # console.log filteredImages
      # uncommenting the above console log will show you that it is correctly
      # creating an array of filtered images based on the size of the row
      @reset filteredImages
      # why is filteredImages getting turned into a collection of Backbone.model
      # objects with no attributes when it gets back to the view?

  fillRowFilter: (images) =>
    containerWidth = @containerWidth - 320
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.get('aspect_ratio') * 270
      return false if width > containerWidth or !image.get('aspect_ratio')?
      totalWidth += width
      totalWidth < containerWidth
    # resizedImages = filteredImages.map (image) ->
      # image.resizeUrlFor({ height: 270 })



