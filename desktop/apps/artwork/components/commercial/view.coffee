{ pick, extend } = require 'underscore'
Backbone = require 'backbone'
User = require '../../../../models/user'
Artwork = require '../../../../models/artwork'
Fair = require '../../../../models/fair'
ArtworkInquiry = require '../../../../models/artwork_inquiry'
Form = require '../../../../components/form/index'
PendingOrder = require '../../../../models/pending_order'
analyticsHooks = require '../../../../lib/analytics_hooks'
openMultiPageModal = require '../../../../components/multi_page_modal/index'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index'
splitTest = require '../../../../components/split_test/index'
template = -> require('./templates/index.jade') arguments...
confirmation = -> require('./templates/confirmation.jade') arguments...

module.exports = class ArtworkCommercialView extends Backbone.View
  tagName: 'form'
  className: 'artwork-commercial'

  events:
    'click .js-artwork-purchase-button' : 'purchase'
    'click .js-artwork-inquire-button'  : 'inquire'
    'click .js-artwork-acquire-button'  : 'acquire'
    'click .collector-faq'              : 'openCollectorModal'

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

  purchase: (e) ->
    e.preventDefault()
    location.assign "#{@artwork.href()}/checkout"

  # Used in the test group of the Purchase flow. Invokes inquiry
  # modal when there is no pre-filled form in the side bar.
  contactGallery: (e) ->
    e.preventDefault()

    $button = @$ '.js-artwork-inquire-button'
    $button.attr 'data-state', 'loading'
    # Defer submit disable so as to allow
    # event handlers to finish propagating
    _.defer ->
      $button.prop 'disabled', true

    @inquiry = new ArtworkInquiry notification_delay: 600
    @user = User.instantiate()
    @artwork.fetch().then =>
      @artwork.related().fairs.add @data.artwork.fair
      @modal = openInquiryQuestionnaireFor
        user: @user
        artwork: @artwork
        inquiry: @inquiry

      # Stop the spinner once the modal opens
      @listenToOnce @modal.view, 'opened', ->
        $button.attr 'data-state', ''
        $button.prop 'disabled', false

      # Success
      @listenToOnce @inquiry, 'sync', =>
        @$('.artwork-commercial__inquiry-buttons')
          .html confirmation()

  inquire: (e) =>
    return @contactGallery(e) if @artwork.is_purchasable
    e.preventDefault()
    @inquiry = new ArtworkInquiry notification_delay: 600

    form = new Form model: @inquiry, $form: @$('form')
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
        commercial: require './helpers'
        partner_stub: require '../partner_stub/helpers'
      ]...
    @$el.html $(html)
    this
