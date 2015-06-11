Backbone = require 'backbone'
Form = require '../../form/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'

module.exports = class ContactView extends Backbone.View
  className: 'scontact'

  template: (->)

  events:
    'click button': 'submit'

  initialize: ->
    @user = CurrentUser.orNull()

  submit: (e) ->
    @form ?= new Form model: @model, $form: @$('form')
    @form.submit e

  render: ->
    @$el.html @template(user: @user)
    this
