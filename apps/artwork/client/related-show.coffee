_                   = require 'underscore'
Backbone            = require 'backbone'
Show                = require '../../../models/partner_show.coffee'
ArtworkColumnsView  = require '../../../components/artwork_columns/view.coffee'
PartnerShowButtons  = require '../../../components/partner_buttons/show_buttons.coffee'

template = -> require('../templates/related_show.jade') arguments...

module.exports = class RelatedShowView extends Backbone.View
  initialize: (options = {}) ->
    { @artwork, @model } = options

    @show = new Show @model.attributes
    @show.fetchArtworks
      success: (collection) =>
        @setup collection

  setup: (collection) ->
    @collection = collection
    @collection.remove @artwork
    @render()
    @setupArtworks @collection
    @setupPartnerButtons()
    @$el.addClass 'is-fade-in'

  render: ->
    @$el.
      show().
      html template(show: @show)

  setupPartnerButtons: ->
    new PartnerShowButtons
      el    : @$('.partner-buttons-show-buttons')
      model : @show

  setupArtworks: (artworks) ->
    @artworkColumnsView = new ArtworkColumnsView
      el               : @$('#artwork-related-show-artworks')
      collection       : artworks
      numberOfColumns  : 4
      gutterWidth      : 40
      maxArtworkHeight : 400
      isOrdered        : false
      seeMore          : false
      allowDuplicates  : true
      artworkSize      : 'tall'
