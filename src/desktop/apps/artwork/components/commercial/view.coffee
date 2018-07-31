{ pick, extend } = require 'underscore'
Backbone = require 'backbone'
qs = require 'qs'
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
Fair = require '../../../../models/fair.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
Form = require '../../../../components/form/index.coffee'
PendingOrder = require '../../../../models/pending_order.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'
splitTest = require '../../../../components/split_test/index.coffee'
AuthModalView = require '../../../../../desktop/components/auth_modal/view.coffee'
sd = require('sharify').data
template = -> require('./templates/index.jade') arguments...
confirmation = -> require('./templates/confirmation.jade') arguments...
{ createOrder } = require '../../../../../lib/components/create_order'

module.exports = class ArtworkCommercialView extends Backbone.View
  tagName: 'form'
  className: 'artwork-commercial'

  events:
    'click .js-artwork-inquire-button'  : 'inquire'
    'click .js-artwork-acquire-button'  : 'acquire'
    'click .collector-faq'              : 'openCollectorModal'

  initialize: ({ @data }) ->
    { artwork } = @data

    @artwork = new Artwork artwork

    if CurrentUser.orNull() and
        qs.parse(location.search.substring(1)).inquire is 'true'
      @inquire()

  acquire: (e) ->
    e.preventDefault()

    # Show the new buy now flow if you have the lab feature enabled
    loggedInUser = CurrentUser.orNull()
    if loggedInUser?.hasLabFeature('New Buy Now Flow')
      createOrder
        user: loggedInUser
        partnerId: @artwork.get('partner_id')
        currencyCode: "usd"
        artworkId: @artwork.get('_id')
        priceCents: 500000, quantity: 1
      .then (data) ->
        order = data?.createOrder?.result?.order
        location.assign("/order2/#{order.id}/shipping")

    else
      order = new PendingOrder
      @form = new Form $form: @$('form'), model: order

      @form.submit e, success: ->
        location.assign "/order/#{order.id}/resume?token=#{order.get 'token'}"

      analyticsHooks
        .trigger 'order:item-added', "Artwork:#{order.get 'artwork_id'}"

  inquire: (e) =>
    e.preventDefault() if e

    @user = User.instantiate()

    if @user.isLoggedOut() && sd.COMMERCIAL?.enableNewInquiryFlow
      redirectTo = "#{location.pathname}#{location.search or "?"}&inquire=true"
      @modal = new AuthModalView { width: '500px', redirectTo }
    else
      @inquiry = new ArtworkInquiry notification_delay: 600

      form = new Form model: @inquiry, $form: @$('form')
      return unless form.isReady()

      form.state 'loading'

      { attending } = data = form.serializer.data()
      @user.set pick data, 'name', 'email'
      @inquiry.set data
      if attending
        @user.related()
          .collectorProfile.related()
          .userFairActions
          .attendFair @data.artwork.fair

      @artwork.fetch().then =>
        @artwork.related().fairs.add @data.artwork.fair
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
          @$('.js-artwork-inquiry-form')
            .html confirmation()

  openCollectorModal: (e) ->
    e.preventDefault()
    openMultiPageModal 'collector-faqs'

  render: ->
    if @data.artwork.fair
      fair = new Fair @data.artwork.fair
    html = template extend @data, { fair },
      helpers: extend [
        {}
        commercial: require './helpers.coffee'
        partner_stub: require '../partner_stub/helpers.coffee'
      ]...
    @$el.html $(html)
    this
