Q = require 'bluebird-q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
DateHelpers = require '../../../../components/util/date_helpers.coffee'
ViewHelpers = require '../../helpers/view_helpers.coffee'
template = -> require('./template.jade') arguments...

module.exports = class RelatedShowsView extends Backbone.View

  className: 'show-related-shows-container'

  initialize: ({ @data, @show, @city, @title }) ->
    @render(@data)
    @filterRelatedImages()
    $(window).on "resize", @filterRelatedImages

  render: (data) ->
    filteredData = data.filter (show) => show.id != @show.id
    unless filteredData.length is 0
      @$el.html template
        fromShowGuide: location.search.match "from-show-guide"
        title: @title
        shows: filteredData
        show: @show
        city: @city
        DateHelpers: DateHelpers
        ViewHelpers: ViewHelpers
      this

  filterRelatedImages: =>
    showWithImagesCollection = @data.map (show) =>
      allImages = show.install_shots.concat _.pluck(show.artworks, 'image')
      filteredImages = @fillRowFilter(allImages)
      show.filteredImages = filteredImages
      show
    @render(showWithImagesCollection)

  fillRowFilter: (images) ->
    containerWidth = $('.show-related-shows-title').width() - $('.show-related-show-info').outerWidth()
    totalWidth = 0
    filteredImages = images.filter (image) ->
      width = image.aspect_ratio * 270 + 6
      return false if totalWidth + width > containerWidth or !image.aspect_ratio?
      totalWidth += width
      totalWidth < containerWidth
