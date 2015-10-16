Backbone = require 'backbone'
Form = require '../../form/index.coffee'
form = require '../../form/utilities.coffee'
CurrentUser = require '../../../models/current_user.coffee'

module.exports = class ContactView extends Backbone.View
  className: 'scontact'

  template: (->)

  events:
    'click button': 'submit'

  initialize: (options = {}) ->
    @user = options.user or CurrentUser.orNull()

  submit: (e) ->
    @form ?= new Form model: @model, $form: @$('form')
    @form.submit e

  autofocus: ->
    form.autofocus @$el, true

  render: ->
    @$el.html @template
      user: @user
      message: null
    @autofocus()
    this
