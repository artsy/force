_                       = require 'underscore'
Backbone                = require 'backbone'
CurrentUser             = require '../../../models/current_user.coffee'
sd                      = require('sharify').data
isEmail                 = require('validator').isEmail
ErrorHandlingForm       = require('./form_base.coffee').ErrorHandlingForm
analytics               = require('../../../lib/analytics.coffee')

module.exports.ShippingForm = class ShippingForm extends ErrorHandlingForm

  events:
    'click .order-form-button' : 'onSubmit'

  initialize: (options) ->
    throw 'You must pass a success callback' unless options.success
    @success = options.success
    @$submit = @$el.find('.order-form-button')
    @setUpFields()

  onSubmit: =>
    return if @$submit.hasClass('is-loading')
    @$submit.addClass 'is-loading'

    analytics.track.funnel 'Order submit shipping', @model

    if @validateForm()
      @model.save @orderAttrs(),
        success: @success
        error: (model, xhr, options) => @showError xhr, 'Order update error'
    else
      @showError 'Please review the error(s) above and try again.'
    false

  internationalizeFields: ->
    @$el.find('select.country').change =>
      if @$el.find('select.country').val() == 'USA'
        @$el.removeClass('not_usa')
        @$el.find('.postal_code label').text 'Zip Code'
      else
        @$el.addClass('not_usa')
        @$el.find('.postal_code label').text 'Postal Code'

  orderAttrs: ->
    reserve: true
    email: @fields.email.el.val()
    telephone: @$el.find('.telephone input').val()
    shipping_address: @shippingAttrs()

  shippingAttrs: ->
    name: @fields.name.el.val()
    street: @fields.street.el.val()
    city: @fields.city.el.val()
    region: @fields.state.el.val()
    postal_code: @fields.zip.el.val()
    country: @fields.country.el.val()

  setUpFields: ->
    @fields =
      email: { el: @$el.find('input.email'), validator: @isEmail }
      name: { el: @$el.find('input.name'), validator: @isPresent }
      street: { el: @$el.find('input.street'), validator: @isPresent }
      city: { el: @$el.find('input.city'), validator: @isPresent }
      state: { el: @$el.find('input.region'), validator: @isState }
      zip: { el: @$el.find('input.postal-code'), validator: @isZip }
      country: { el: @$el.find('select.country'), validator: -> true }

    @shippingFields = _.pick @fields, ['name', 'street', 'city', 'state', 'zip', 'country']
    @internationalizeFields()

  isEmail: ($el) -> isEmail($el.val())
  isPresent: ($el) -> $el.val()? && $.trim($el.val()).length > 0
  isState: ($el) => @isPresent($el) || $el.parent().parent().find('select.country').val() != 'USA'
  isZip: ($el) => @isPresent($el) && ($el.parent().parent().find('select.country').val() != 'USA' || $el.val().trim().match(/^\d{5}/))
