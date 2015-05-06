ModalView = require '../../../../components/modal/view.coffee'
buyersPremium = require '../../../../components/buyers_premium/index.coffee'

class BuyersPremiumModal extends ModalView
  template: -> #

  initialize: ({ @auction }) ->
    super width: 700

  postRender: ->
    @isLoading()
    buyersPremium @auction, (err, html) =>
      @$('.modal-body').html html
      @updatePosition()
      @isLoaded()
