_ = require 'underscore'
Backbone = require 'backbone'
InstallShot = require '../../models/install_shot.coffee'
CarouselView = require '../carousel/view.coffee'
{ API_URL } = require('sharify').data

module.exports = class ArtistCarouselView extends Backbone.View
  className: 'artist-carousel carousel'

  minLength: 4

  initialize: ->
    return @remove() unless @shouldDisplay()

    @$el.attr 'class', @className
    @renderSpinner()

    @collection = new Backbone.Collection [], model: InstallShot
    @listenTo @model.relatedShows, 'sync', @checkRelatedShows
    @fetchIconicWorks()

  shouldDisplay: ->
    @model.get('published_artworks_count') >= @minLength

  renderSpinner: ->
    @$el.html $('<div />').attr 'class', 'loading-spinner'

  fetchIconicWorks: ->
    @model.artworks.fetch
      data: sort: '-iconicity', published: true, size: 7
      success: (collection, response, options) =>
        @collection.add collection.map (artwork) ->
          image = artwork.defaultImage()
          image.set 'href', artwork.href()
          image
        @render()

  findSoloShows: ->
    @model.relatedShows.filter (partnerShow) =>
      partnerShow.get('artists').length is 1

  checkRelatedShows: ->
    if (soloShows = @findSoloShows()).length
      timeout = null
      @fetchAllInstallShots soloShows, success: -> clearInterval timeout
      # If this doesn't come back in 3 seconds then just render
      timeout = _.delay (=> @render()), 3000
    else
      @render()

  fetchInstallShotsForShow: (show, options = {}) ->
    options.success = _.wrap options.success, (success, collection, response, options) ->
      if response.length
        response = _.map response, (image) ->
          image.href = show.href()
          image
      success? collection, response, options
    new Backbone.Collection().fetch _.defaults options,
      data: default: false, size: 1
      url: "#{API_URL}/api/v1/partner_show/#{show.id}/images"

  fetchAllInstallShots: (shows) ->
    $.when.apply(null, shows.map (show) =>
      @fetchInstallShotsForShow show, success: (collection, response, options) =>
        @collection.add response
    ).then => @render()

  postRender: ->
    # Show and hide carousel depending on the space it occupies
    @listenTo @carouselView, 'width:insufficient', -> @$el.hide()
    @listenTo @carouselView, 'width:sufficient', -> @$el.show()

  # Called once after iconic works are fetched, and again after install shots are fetched
  render: _.after 2, ->
    return if @rendered or @minLength > @collection.length
    @carouselView = new CarouselView el: @$el, collection: @collection
    @postRender()
    @rendered = true
    this
