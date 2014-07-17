_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
ModalView = require '../modal/view.coffee'
mediator = require '../../lib/mediator.coffee'
Form = require '../mixins/form.coffee'
CurrentUser = require '../../models/current_user.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
analytics = require '../../lib/analytics.coffee'
FlashMessage = require '../flash/index.coffee'
AfterInquiry = require '../after_inquiry/mixin.coffee'

template = -> require('./templates/index.jade') arguments...

module.exports = class ContactView extends ModalView
  _.extend @prototype, Form
  _.extend @prototype, AfterInquiry

  className: 'contact'

  eligibleForAfterInquiryFlow: false

  template: template
  headerTemplate: -> 'Comments'
  formTemplate: -> 'Override `formTemplate` to fill in this form'

  defaults: ->
    width: '470px'
    successMessage: 'Thank you. Your message has been sent.'
    placeholder: 'Your message'
    url: "#{sd.API_URL}/api/v1/feedback"

  events: -> _.extend super,
    'submit form': 'submit'
    'click #contact-submit': 'submit'
    'mouseenter #contact-submit': 'logHover'

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults()

    @user = CurrentUser.orNull()

    @model = new Backbone.Model
    @model.url = @options.url

    _.extend @templateData,
      user: @user
      placeholder: @options.placeholder

    @on 'click:close', ->
      analytics.track.click "Closed the inquiry form via the '×' button"
    @on 'click:backdrop', ->
      analytics.track.click "Closed the inquiry form by clicking the modal window backdrop"

    super @options

  logHover: ->
    analytics.track.hover "Hovered over contact form 'Send' button"

  postRender: ->
    @renderTemplates()

  renderTemplates: ->
    @$('#contact-header').html @headerTemplate(@templateData)
    @$('#contact-form').html @formTemplate(@templateData)

  submit: (e) ->
    e.preventDefault()

    return unless @validateForm()
    return if @formIsSubmitting()

    @$submit ?= @$('#contact-submit')
    @$errors ?= @$('#contact-errors')

    @$submit.attr 'data-state', 'loading'

    # Set the data but don't persist it yet
    @model.set @serializeForm()

    @maybeSend @model,
      success: =>
        @close =>
          new FlashMessage message: @options.successMessage
      error: (model, xhr, options) =>
        @reenableForm()
        @$errors.text @errorMessage(xhr)
        @$submit.attr 'data-state', 'error'
        @updatePosition()

    analytics.track.funnel 'Contact form submitted', @model.attributes

  focusTextareaAfterCopy: =>
    return unless @autofocus()
    val = ($textarea = @$('textarea')).val()
    $textarea.focus().val('').val val
