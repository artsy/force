Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
{ createOrder } = require '../../../../../lib/components/create_order'
{ acquireArtwork } = require('../../../../components/acquire/view.coffee')

module.exports = class MetaDataView extends Backbone.View

  events:
    'click #artwork-page-edition-sets input[type=radio]': 'addEditionToOrder'
    'click .js-purchase': 'buy'

  initialize: ->
    @editionSetId = @$('#artwork-page-edition-sets li').first().find('input').val()

  addEditionToOrder: (e) ->
    @editionSetId = $(e.target).val()

  buy: (e) ->
    loggedInUser = CurrentUser.orNull()
    isAuctionPartner = @model.get('partner').type == 'Auction' or @model.get('partner').type == 'Auction House'
    console.log isAuctionPartner
    if loggedInUser?.hasLabFeature('New Buy Now Flow') and not isAuctionPartner
      createOrder
        artworkId: @model.get('_id')
        editionSetId: @editionSetId
        quantity: 1
        user: loggedInUser
      .then (data) ->
        order = data?.createOrderWithArtwork?.orderOrError?.order
        location.assign("/order2/#{order.id}/shipping")
    else
      acquireArtwork @model, $(e.target), @editionSetId