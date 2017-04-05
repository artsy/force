_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Backbone = require 'backbone'
ModalView = require '../modal/view'
mediator = require '../../lib/mediator'
Form = require '../mixins/form'
CurrentUser = require '../../models/current_user'
analyticsHooks = require '../../lib/analytics_hooks'
FlashMessage = require '../flash/index'

template = -> require('./templates/index.jade') arguments...

module.exports = class ContactView extends ModalView
  _.extend @prototype, Form

  className: 'contact'

  template: template
  headerTemplate: -> 'Comments'
  formTemplate: -> 'Override `formTemplate` to fill in this form'

  defaults: ->
    width: '470px'
    successMessage: 'Thank you. Your message has been sent.'
    placeholder: 'Your message'
    url: "#{sd.API_URL}/api/v1/feedback"

  events: -> _.extend super,
    'submit form': 'onSubmit'
    'click #contact-submit' : 'onSubmit'
    'click .contact-nevermind' : 'close'
    'mouseenter #contact-submit' : 'logHover'

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults()

    @user = CurrentUser.orNull()

    @model = new Backbone.Model
    @model.url = @options.url

    _.extend @templateData,
      user: @user
      placeholder: @options.placeholder

    @on 'click:close', ->
      analyticsHooks.trigger 'contact:close-x'
    @on 'click:backdrop', ->
      analyticsHooks.trigger 'contact:close-back'

    super @options

  logHover: ->
    analyticsHooks.trigger 'contact:hover'

  postRender: ->
    @renderTemplates()

  renderTemplates: ->
    # Hiding the close button here for now to account for new styling
    @$('.modal-close').hide()
    @$('#contact-header').html @headerTemplate(@templateData)
    @$('#contact-form').html @formTemplate(@templateData)

  onSubmit: (e) ->
    return false unless @validateForm()
    return false if @formIsSubmitting()

    e.preventDefault()

    @$submit ?= @$('#contact-submit')
    @$errors ?= @$('#contact-errors')

    @$submit.attr 'data-state', 'loading'

    @model.set @serializeForm()

  submit: ->
    @model.save null,
      success: =>
        @close =>
          new FlashMessage message: @options.successMessage
          analyticsHooks.trigger 'contact:submitted', attributes: @model.attributes
      error: (model, xhr, options) =>
        @reenableForm()
        @$errors.text @errorMessage(xhr)
        @$submit.attr 'data-state', 'error'
        @updatePosition()

  focusTextareaAfterCopy: =>
    return unless @autofocus()
    val = ($textarea = @$('textarea')).val()
    $textarea.focus().val('').val val
