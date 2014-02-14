Backbone        = require 'backbone'
ArtworkView     = require './view.coffee'
DeepZoomView    = require './deep-zoom.coffee'
ViewInRoomView  = require './view-in-room.coffee'
analytics       = require '../../../lib/analytics.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
    'artwork/:id'              : 'show'
    'artwork/:id/zoom'         : 'zoom'
    'artwork/:id/more-info'    : 'moreInfo'
    'artwork/:id/view-in-room' : 'viewInRoom'

  initialize: (options) ->
    { @artwork, @artist } = options
    @baseView = new ArtworkView el: $('#artwork-page'), artwork: @artwork, artist: @artist

  show: ->
    @_teardown()
    @baseView.route 'show'

  zoom: ->
    @_teardown()
    analytics.track.click 'Clicked to zoom in on artwork'
    @baseView.route 'zoom'
    @view = new DeepZoomView $container: $('#artwork-deep-zoom-container'), artwork: @artwork
    @view.render()

  moreInfo: ->
    @_teardown()
    return unless @artwork.hasMoreInfo()
    analytics.track.click "Viewed 'More Info'"
    @baseView.route 'more-info'

  viewInRoom: ->
    @_teardown()
    analytics.track.click "Entered 'View In Room'"
    @baseView.route 'view-in-room'
    @view = new ViewInRoomView $container: $('#artwork-view-in-room-container'), $img: $('#the-artwork-image'), artwork: @artwork
    @view.render()

  _teardown: ->
    @view?.remove()
