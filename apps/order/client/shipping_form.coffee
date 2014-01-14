_                       = require 'underscore'
Backbone                = require 'backbone'
CurrentUser             = require '../../../models/current_user.coffee'
sd                      = require('sharify').data
ErrorHandlingForm       = require('./form_base.coffee').ErrorHandlingForm
analytics               = require('../../../lib/analytics.coffee')

module.exports.ShippingForm = class ShippingForm extends ErrorHandlingForm

  events:
    'click .order-form-button' : 'onSubmit'

  initialize: (options) ->
    throw 'You must pass a success callback' unless options.success
    @success = options.success
    @$submit = @$('.order-form-button')
    @setUpFields()

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analytics.track.funnel 'Order submit shipping', label: analytics.modelToLabel(@model)

    if @validateForm()
      @model.save @orderAttrs(),
        success: @success
        error: (model, xhr, options) => @showError xhr, 'Order update error'
    else
      @showError 'Please review the error(s) above and try again.'
    false

  internationalizeFields: ->
    @$('select.country').change =>
      if @$('select.country').val() == 'USA'
        @$el.removeClass('not-usa')
        @$('.postal-code label').text 'Zip Code'
      else
        @$el.addClass('not-usa')
        @$('.postal-code label').text 'Postal Code'

  orderAttrs: ->
    attrs =
      reserve: true
      telephone: @$('.telephone input').val()
      shipping_address: @shippingAttrs()
    attrs.email = @fields.email.el.val() if @fields.email?.el.val()
    attrs

  shippingAttrs: ->
    name: @fields.name.el.val()
    street: @fields.street.el.val()
    city: @fields.city.el.val()
    region: @fields.state.el.val()
    postal_code: @fields.zip.el.val()
    country: @fields.country.el.val()

  setUpFields: ->
    @fields =
      email: { el: @$('input.email'), validator: @isEmail }
      name: { el: @$('input.name'), validator: @isPresent }
      street: { el: @$('input.street'), validator: @isPresent }
      city: { el: @$('input.city'), validator: @isPresent }
      state: { el: @$('input.region'), validator: @isState }
      zip: { el: @$('input.postal-code'), validator: @isZip }
      country: { el: @$('select.country'), validator: -> true }
    @internationalizeFields()
