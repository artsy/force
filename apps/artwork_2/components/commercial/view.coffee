{ pick, extend } = require 'underscore'
Backbone = require 'backbone'
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
Form = require '../../../../components/form/index.coffee'
PendingOrder = require '../../../../models/pending_order.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'

module.exports = class ArtworkCommercialView extends Backbone.View
  events:
    'click .js-artwork-inquire-button': 'inquire'
    'click .js-artwork-acquire-button': 'acquire'

  initialize: ({ data }) ->
    { artwork, @fair } = data

    @user = User.instantiate()
    @artwork = new Artwork artwork

  acquire: (e) ->
    e.preventDefault()

    order = new PendingOrder
    form = new Form $form: @$el, model: order

    form.submit e, success: ->
      location.assign "/order/#{order.id}/resume?token=#{order.get 'token'}"

    analyticsHooks
      .trigger 'order:item-added', "Artwork:#{order.get 'artwork_id'}"

  inquire: (e) ->
    e.preventDefault()

    @inquiry = new ArtworkInquiry notification_delay: 600

    form = new Form model: @inquiry, $form: @$el
    return unless form.isReady()

    form.state 'loading'

    { attending } = data = form.serializer.data()

    @user.set pick data, 'name', 'email'
    @inquiry.set data

    if attending
      @user.related()
        .collectorProfile.related()
        .userFairActions.related()
        .attendFair @fair

    @artwork.fetch().then =>
      @modal = openInquiryQuestionnaireFor
        user: @user
        artwork: @artwork
        inquiry: @inquiry

      # Stop the spinner once the modal opens
      @listenToOnce @modal.view, 'opened', ->
        form.state 'default'

      # Abort or error
      @listenToOnce @modal.view, 'closed', ->
        form.reenable true

      # Success
      @listenToOnce @inquiry, 'sync', =>
        @$el.html confirmation
          artwork: @artwork
