_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator.coffee'
PartnerLocations = require '../../../apps/artwork/components/partner_locations/index.coffee'
InquiryView = require "../../contact/inquiry.coffee"
SaleArtworkView = require '../../artwork_item/views/sale_artwork.coffee'

artworkRow = -> require('../templates/artwork_row.jade') arguments...

module.exports = class ArtworkRowView extends SaleArtworkView
  displayPurchase: true

  initialize: (options = {})->
    { @$container, @model } = options
    @render()

    super

    @$('.artwork-table__cell--caption, .artwork-table__cell--image').hover \
      (=> @$('.hoverable-image-link').addClass 'is-hovered'), \
      (=> @$('.hoverable-image-link').removeClass 'is-hovered')

  render: ->
    renderedArtwork = artworkRow
      artwork: @model
      displayPurchase: @displayPurchase

    @$el = $(renderedArtwork)
    @$container.append @$el
    @pl = new PartnerLocations $el: @$el, artwork: @model

    return @$el
