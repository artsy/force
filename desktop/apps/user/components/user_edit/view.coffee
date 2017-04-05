Backbone = require 'backbone'
Form = require '../../../../components/form/index'
FlashMessage = require '../../../../components/flash/index'

module.exports = class UserEditFormView extends Backbone.View
  className: 'grouped-section'

  template: ->
    throw new Error 'define a template'

  events:
    'click button': 'submit'

  submit: (e) ->
    form = new Form model: @model, $form: @$('form')
    form.submit e, success: =>
      form.reenable true
      @model.refresh()
      new FlashMessage message: 'Your settings have been saved'

  postRender: -> # noop

  render: ->
    @$el.html @template
      user: @model
    @postRender()
    this
