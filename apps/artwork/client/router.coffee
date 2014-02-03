Backbone      = require 'backbone'
ArtworkView   = require './view.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
    'artwork/:id'              : 'show'
    'artwork/:id/zoom'         : 'zoom'
    'artwork/:id/more-info'    : 'moreInfo'
    'artwork/:id/view-in-room' : 'viewInRoom'

  initialize: (options) ->
    { @artwork, @artist } = options

    @view = new ArtworkView el: $('#artwork-page'), artwork: @artwork, artist: @artist

  show: ->
    @view.route 'show'

  zoom: ->
    @view.route 'zoom'

  moreInfo: ->
    return unless @artwork.hasMoreInfo()
    @view.route 'more-info'

  viewInRoom: ->
    @view.route 'view-in-room'
