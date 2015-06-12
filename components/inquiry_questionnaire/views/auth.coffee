Backbone = require 'backbone'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
{ fade } = require '../../mixins/transition.coffee'
templates =
  login: -> require('../templates/login.jade') arguments...
  forgot: -> require('../templates/forgot.jade') arguments...

module.exports = class Auth extends StepView
  className: 'iq-auth'

  template: ->
    templates[@mode.get('mode')] arguments...

  __events__:
    'click .js-mode': 'change'
    'click button': 'submit'

  initialize: ({ @modal, @user, @state, @artwork }) ->
    @mode = new Backbone.Model mode: 'login'
    @listenTo @mode, 'change:mode', @render

  submit: (e) ->
    form = new Form model: @user, $form: @$('form'), $submit: @$('.js-form-submit')
    return unless form.start()

    e.preventDefault()

    form.state 'loading'

    @user.set form.serializer.data()
    @user[@mode.get('mode')]
      error: _.bind(form.error, form)
      success: =>
        @state.trigger 'done'

  change: (e) ->
    e.preventDefault()
    @mode.set 'mode', $(e.currentTarget).data('mode')

  __render__: =>
    @$el.html @template
      user: @user
      state: @state
      artwork: @artwork
    @__rendered__ = true

  render: ->
    if @__rendered__
      fade @$el, out: @__render__
    else
      @__render__()
    this
