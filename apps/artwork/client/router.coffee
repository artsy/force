Backbone        = require 'backbone'
ArtworkView     = require './view.coffee'
DeepZoomView    = require './deep-zoom.coffee'
ViewInRoomView  = require './view-in-room.coffee'

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
    @baseView.route 'zoom'
    @view = new DeepZoomView $container: $('#artwork-deep-zoom-container'), artwork: @artwork
    @view.render()

  moreInfo: ->
    @_teardown()
    return unless @artwork.hasMoreInfo()
    @baseView.route 'more-info'

  viewInRoom: ->
    @_teardown()
    @baseView.route 'view-in-room'
    @view = new ViewInRoomView $container: $('#artwork-view-in-room-container'), $img: $('#the-artwork-image'), artwork: @artwork
    @view.render()

  _teardown: ->
    @view?.remove()
