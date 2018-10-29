Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user.coffee'
{ createOrder } = require '../../../../../lib/components/create_order'
errorModal = require '../../../../../desktop/apps/artwork/client/errorModal.tsx'
sd = require('sharify').data
mediator = require '../../../../lib/mediator.coffee'

module.exports = class MetaDataView extends Backbone.View

  events:
    'click #artwork-page-edition-sets input[type=radio]': 'addEditionToOrder'
    'click .js-purchase': 'buy'
    'click .js-offer': 'offer'

  initialize: ->
    @editionSetId = @$('#artwork-page-edition-sets li').first().find('input').val()

  addEditionToOrder: (e) ->
    @editionSetId = $(e.target).val()

  buy: (e) ->
    loggedInUser = CurrentUser.orNull()

    analytics.track('Click', {
      subject: 'buy',
      type: 'button',
      flow: 'buy now'
    })

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
          analytics.track('created_order', { order_id: order.id })
          location.assign("/orders/#{order.id}/shipping")
        else
          console.error('createOrder', error)
          errorModal.renderBuyNowError(error)
      .catch (err) ->
        console.error('createOrder', err)
        errorModal.render()

  offer: (e) ->
    loggedInUser = CurrentUser.orNull()

    # If this artwork has an edition set of 1, send that in the mutation as well
    if @model.get('edition_sets')?.length && @model.get('edition_sets').length == 1
      singleEditionSetId = @model.get('edition_sets')[0] && @model.get('edition_sets')[0].id

    if not loggedInUser
      return location.assign "/login?redirectTo=#{@model.href()}&signupIntent=make+offer&intent=make+offer&trigger=click"
    else
      console.log("making offer!")

