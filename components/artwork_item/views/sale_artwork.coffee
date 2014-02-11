_                       = require 'underscore'
sd                      = require('sharify').data
Backbone                = require 'backbone'
AcquireArtwork          = require('../../acquire/view.coffee').acquireArtwork
SaveControls            = require '../../artwork_item/views/save_controls.coffee'

module.exports = class SaleArtworkView extends Backbone.View

  analyticsRemoveMessage: "Removed artwork from collection, via sale"
  analyticsSaveMessage: "Added artwork to collection, via sale"

  events:
    "click .artwork-item-buy" : "acquire"
    # TODO: Add auction bid handling here
    #"click .artwork-item-bid": "bid"

  initialize: (options) ->
    { @artworkCollection } = options
    saveView = new SaveControls
      artworkCollection: @artworkCollection
      el               : @$el
      model            : @model
    saveView.analyticsRemoveMessage = @analyticsRemoveMessage
    saveView.analyticsSaveMessage   = @analyticsSaveMessage

  acquire: (event) =>
    # redirect to artwork page if artwork has multiple editions
    if @model.get('edition_sets_count') > 1
      return window.location.href = @model.href()

    AcquireArtwork @model, $(event.target)
    false

  # TODO: Wire this up with auctions support
  #bid: (event) =>
  #  $target = $(event.target)
  #  id = $target.attr('data-id')
  #  @bidArtwork @model, @model.get 'sale_artwork'
  #  false
