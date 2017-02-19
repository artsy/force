sd = require('sharify').data
ThankYouView = require './thank_you_view.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
modalize = require '../../../components/modalize/index.coffee'
Backbone = require 'backbone'

module.exports = class EmailRegistrationView extends Backbone.View

  initialize: ({ @auction }) ->

  openThankYou: ->
    thankYouView = new ThankYouView
    modal = modalize thankYouView, dimensions: width: '400px'
    thankYouView.on 'done', -> modal.close()
    modal.open()
    thankYouView.result
      .then((willRegister) =>
        {
          emailAddress: emailAddress
          willRegister: willRegister
        }
      )
      .then ({emailAddress, willRegister}) =>
        authModalView = new AuthModalView
          width: '500px'
          redirectTo: if willRegister then @auction.registerUrl() else '/personalize'
          userData: email: emailAddress

  subscribe: (emailAddress) ->
    @$('.avant-garde-button-black').addClass('is-loading')
    $.ajax({
      url: window.location.pathname  + '/form'
      data: email: emailAddress
      type: 'POST'
    }).then => @$('.avant-garde-button-black').removeClass('is-loading')

  events:
    'click .auction-preview-register-now a': 'register'
    'submit .auction-preview-sidebar-form': 'submit'

  register: (e) ->
    e.preventDefault()
    authModalView = new AuthModalView
      width: '500px'
      redirectTo: @auction.registerUrl()

  submit: (e) ->
    e.preventDefault()
    emailAddress = $(e.target).find('[name=email]').val()
    @subscribe(emailAddress).then =>
      analyticsHooks.trigger 'auction:notify-me', { email: emailAddress }
      @openThankYou()

