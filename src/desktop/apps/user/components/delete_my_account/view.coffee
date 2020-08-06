Backbone = require 'backbone'
Form = require '../../../../components/form/index.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class DeleteMyAccountView extends Backbone.View
  className: 'settings-delete-my-account'

  events:
    'click button': 'submit'
    'click input[name="confirm"]': 'confirm'

  initialize: ({ @user }) -> #

  confirm: (e) ->
    confirmed = @$(e.currentTarget).is ':checked'
    @$('button').prop 'disabled', not confirmed

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('form')
    return unless form.isReady()

    { confirm, explanation } = form.data()
    return unless confirm

    form.state 'loading'

    Promise.resolve $.ajax
      method: 'DELETE'
      url: @user.url()
      data:
        access_token: @user.get 'accessToken'
        explanation: explanation
        url: '/user/delete'

    .then ->
      Promise.resolve $.ajax
        method: 'DELETE'
        url: '/users/sign_out'

    .then ->
      form.state 'default'
      new FlashMessage
        href: '/'
        autoclose: false
        message: 'Your account has been deleted, click here to continue'

    .catch (err) ->
      form.error err
      new FlashMessage
        href: '/user/delete'
        autoclose: false
        safe: false
        message: err.responseJSON.message

  render: ->
    @$el.html template()
    this
