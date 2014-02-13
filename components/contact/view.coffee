_                   = require 'underscore'
sd                  = require('sharify').data
Backbone            = require 'backbone'
ModalView           = require '../modal/view.coffee'
mediator            = require '../../lib/mediator.coffee'
Form                = require '../mixins/form.coffee'
CurrentUser         = require '../../models/current_user.coffee'
{ isTouchDevice }   = require '../util/device.coffee'

template        = -> require('./templates/index.jade') arguments...
headerTemplate  = -> require('./templates/header.jade') arguments...

module.exports = class ContactView extends ModalView
  _.extend @prototype, Form

  className: 'contact'

  template: template
  headerTemplate: headerTemplate
  templateData: {}

  defaults: ->
    width: '800px'
    successMessage: 'Thank you. Your message has been sent.'
    placeholder: 'Your message'
    url: "#{sd.ARTSY_URL}/api/v1/feedback"

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults()
    _.extend @templateData,
      user: CurrentUser.orNull()
      isTouchDevice: isTouchDevice()
      placeholder: @options.placeholder

    @model      = new Backbone.Model
    @model.url  = @options.url

    super @options

  events: -> _.extend super,
    'submit form'           : 'submit'
    'click #contact-submit' : 'submit'

  postRender: ->
    @$('#modal-contact-header').html @headerTemplate(@templateData)

  success: =>
    @$dialog.attr 'data-state', 'fade-out'
    _.delay =>
      @$el.addClass 'modal-contact-success-message'
      @$dialog.
        addClass('is-notransition').
        html @options.successMessage
      @updatePosition()
      _.defer =>
        @$dialog.
          removeClass('is-notransition').
          css opacity: 1
        # Wait 3 seconds and automatically close
        _.delay (-> mediator.trigger('modal:close')), 3000
    , 250

  submit: (e) ->
    e.preventDefault()
    @$form ?= @$('form')
    if @validateForm @$form
      @$submit ?= @$('#contact-submit')
      @$submit.attr 'data-state', 'loading'
      @model.save @serializeForm(@$form),
        success: @success
        error: =>
          @$submit.attr 'data-state', 'error'
