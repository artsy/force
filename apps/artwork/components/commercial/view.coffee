{ pick, extend } = require 'underscore'
{ PURCHASE_FLOW } = require('sharify').data
Backbone = require 'backbone'
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
Form = require '../../../../components/form/index.coffee'
PendingOrder = require '../../../../models/pending_order.coffee'
analyticsHooks = require '../../../../lib/analytics_hooks.coffee'
openMultiPageModal = require '../../../../components/multi_page_modal/index.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'
template = -> require('./templates/index.jade') arguments...
confirmation = -> require('./templates/confirmation.jade') arguments...

module.exports = class ArtworkCommercialView extends Backbone.View
  tagName: 'form'
  className: 'artwork-commercial'

  events: ->
    purchase_flow = PURCHASE_FLOW is 'purchase'
    inquireAction = if purchase_flow then 'contactGallery' else 'inquire'
    return {
      'click .js-artwork-inquire-button' : inquireAction
      'click .js-artwork-acquire-button' : 'acquire'
      'click .collector-faq'             : 'openCollectorModal'
    }

  initialize: ({ @data }) ->
    { artwork } = @data

    @artwork = new Artwork artwork

  acquire: (e) ->
    e.preventDefault()

    order = new PendingOrder
    @form = new Form $form: @$('form'), model: order

    @form.submit e, success: ->
      location.assign "/order/#{order.id}/resume?token=#{order.get 'token'}"

    analyticsHooks
      .trigger 'order:item-added', "Artwork:#{order.get 'artwork_id'}"


  # The same as inquire, triggers the inquiry modal. Used in the test group
  # of the Purchase flow. Does not include pre-filled form in the side bar,
  # only a button to invoke the modal.
  contactGallery: (e) ->
    e.preventDefault()

    @inquiry = new ArtworkInquiry notification_delay: 600

    @user = User.instantiate()
    @artwork.fetch().then =>
      @artwork.related().fairs.add @data.artwork.fair
      @modal = openInquiryQuestionnaireFor
        user: @user
        artwork: @artwork
        inquiry: @inquiry

      # Success
      @listenToOnce @inquiry, 'sync', =>
        @$('.js-artwork-inquire-button')
          .html confirmation()

  inquire: (e) ->
    e.preventDefault()

    @inquiry = new ArtworkInquiry notification_delay: 600

    form = new Form model: @inquiry, $form: @$el
    return unless form.isReady()

    form.state 'loading'

    { attending } = data = form.serializer.data()
    @user = User.instantiate()
    @user.set pick data, 'name', 'email'
    @inquiry.set data

    if attending
      @user.related()
        .collectorProfile.related()
        .userFairActions
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
        @$('.js-artwork-inquiry-form')
          .html confirmation()

  openCollectorModal: (e) ->
    e.preventDefault()
    openMultiPageModal 'collector-faqs'

  render: ->
    @$el.html template extend @data,
      helpers: extend [
        {}
        commercial: require './helpers.coffee'
        partner_stub: require '../partner_stub/helpers.coffee'
      ]...

    this
