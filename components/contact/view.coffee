_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
ModalView     = require '../modal/view.coffee'
mediator      = require '../../lib/mediator.coffee'
Form          = require '../mixins/form.coffee'
CurrentUser   = require '../../models/current_user.coffee'
analytics     = require('../../lib/analytics.coffee')

template        = -> require('./templates/index.jade') arguments...

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
    url: "#{sd.ARTSY_URL}/api/v1/feedback"

  events: -> _.extend super,
    'submit form'                : 'submit'
    'click #contact-submit'      : 'submit'
    'mouseenter #contact-submit' : 'logHover'

  initialize: (options = {}) ->
    @options = _.defaults options, @defaults()
    _.extend @templateData,
      user: @user
      placeholder: @options.placeholder

    @user       = CurrentUser.orNull()
    @model      = new Backbone.Model
    @model.url  = @options.url

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

  success: =>
    @$dialog.attr 'data-state', 'fade-out'
    _.delay =>
      @$el.addClass 'contact-success-message'
      @$dialog.
        addClass('is-notransition').
        html(@options.successMessage).
        width 'auto'
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

    if @validateForm (@$form ?= @$('form'))
      @$submit    ?= @$('#contact-submit')
      @$errors    ?= @$('#contact-errors')

      @$submit.attr 'data-state', 'loading'

      formData = @serializeForm(@$form)

      @model.save formData,
        success: @success
        error: (model, xhr, options) =>
          @$errors.text @errorMessage(xhr)
          @$submit.attr 'data-state', 'error'
          @updatePosition()

      analytics.track.funnel 'Contact form submitted', formData

  focusTextareaAfterCopy: =>
    return unless @autofocus()
    val = @$('textarea').val()
    @$('textarea').focus().val('').val(val)
