Backbone      = require 'backbone'
ArtworkView   = require './view.coffee'
DeepZoomView  = require './deep-zoom.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
    'artwork/:id'              : 'show'
    'artwork/:id/zoom'         : 'zoom'
    'artwork/:id/more-info'    : 'moreInfo'
    'artwork/:id/view-in-room' : 'viewInRoom'

  initialize: (options) ->
    { @artwork, @artist } = options

    @view = new ArtworkView el: (@$page = $('#artwork-page')), artwork: @artwork, artist: @artist

  show: ->
    @_teardown()
    @view.route 'show'

  zoom: ->
    @view.route 'zoom'

    @deepZoomView = new DeepZoomView $container: $('#artwork-deep-zoom-container'), artwork: @artwork
    @deepZoomView.render()

  moreInfo: ->
    @_teardown()
    return unless @artwork.hasMoreInfo()
    @view.route 'more-info'

  viewInRoom: ->
    @view.route 'view-in-room'

  _teardown: ->
    @deepZoomView?._close()
