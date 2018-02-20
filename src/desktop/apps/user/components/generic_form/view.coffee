Backbone = require 'backbone'
FlashMessage = require '../../../../components/flash/index.coffee'
Form = require '../../../../components/form/index.coffee'

module.exports = class GenericFormView extends Backbone.View
  events:
    'click button': 'submit'
    'input input': 'change'

  initialize: ({ @model, @user }) -> #

  change: ->
    return if @__changed__

    @__changed__ = yes

    @$('button')
      .removeClass 'avant-garde-button-white'
      .addClass 'avant-garde-button-black'

  submit: (e) ->
    e.preventDefault()

    (form = new Form model: @model, $form: @$('form'))
      .submit e, success: =>
        form
          .state 'default'
          .reenable()

        @user.refresh()

        new FlashMessage
          message: 'Your settings have been saved'
