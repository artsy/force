Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
overlayTemplate = -> require('./overlay.jade') arguments...

module.exports = class ArtistPageCTAView extends Backbone.View

  className: 'artist-page-cta'

  events:
    'click': 'fullScrenOverlay'

  fullScrenOverlay: ->
    @$el.addClass 'fullscreen'
    @$('.main-layout-container').html overlayTemplate
      artist: @artist
    @$('.artist-page-cta-overlay__close').on 'click', @closeOverlay

  closeOverlay: (e) =>
    e.stopPropagation()
    @$el.removeClass 'fullscreen'
    @render()

  initialize: ({ artist }) ->
    @artist = artist

  render: ->
    @$el.html template
      artist: @artist 
    @
