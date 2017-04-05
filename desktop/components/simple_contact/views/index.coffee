Backbone = require 'backbone'
Form = require '../../form/index'
form = require '../../form/utilities'
CurrentUser = require '../../../models/current_user'

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
