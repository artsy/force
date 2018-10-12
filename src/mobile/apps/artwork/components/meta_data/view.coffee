Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
{ createOrder } = require '../../../../../lib/components/create_order'
{ acquireArtwork } = require('../../../../components/acquire/view.coffee')
errorModal = require '../../../../../desktop/apps/artwork/client/errorModal.tsx'
sd = require('sharify').data
mediator = require '../../../../lib/mediator.coffee'

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
    isAuctionPartner =
      @model.get('partner').type == 'Auction' or
      @model.get('partner').type == 'Auction House'

    if sd.ENABLE_NEW_BUY_NOW_FLOW || loggedInUser?.hasLabFeature('New Buy Now Flow')
      # If this artwork has an edition set of 1, send that in the mutation as well
      if @model.get('edition_sets')?.length && @model.get('edition_sets').length == 1
        singleEditionSetId = @model.get('edition_sets')[0] && @model.get('edition_sets')[0].id

      if not loggedInUser
        return location.assign "/login?redirectTo=#{@model.href()}&signupIntent=buy+now&intent=buy+now&trigger=click"
      else
        createOrder
          artworkId: @model.get('_id')
          editionSetId: @editionSetId || singleEditionSetId
          quantity: 1
          user: loggedInUser
        .then (data) ->
          { order, error } = data?.ecommerceCreateOrderWithArtwork?.orderOrError || {}
          if order
            location.assign("/orders/#{order.id}/shipping")
          else
            console.error('createOrder', error)
            errorModal.renderBuyNowError(error)
        .catch (err) ->
          console.error('createOrder', err)
          errorModal.render()

    else if isAuctionPartner
      acquireArtwork @model, $(e.target), @editionSetId