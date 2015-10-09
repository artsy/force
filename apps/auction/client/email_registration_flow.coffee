{ MAILCHIMP_WELCOME_LIST_ID } = require('sharify').data
EmailToRegistrationTransitionView = require './email_to_registration_transition.coffee'
EmailView = require '../../../components/email/view.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
modalize = require '../../../components/modalize/index.coffee'

module.exports = (auction) ->
  emailView = new EmailView
    el: $('.auction-preview-sidebar-email')
    listId: MAILCHIMP_WELCOME_LIST_ID
    buttonText: 'Notify me'
    autofocus: true
    mergeVars:
      "AUCTION_#{auction.id}": true

  emailView.result
  .then (emailAddress) ->
    analyticsHooks.trigger 'auction:notify-me', { email: emailAddress }
    transitionView = new EmailToRegistrationTransitionView
    modal = modalize transitionView, dimensions: width: '400px'
    transitionView.on 'done', -> modal.close()
    modal.open()

    # Bundle together the user will make in the view
    # with the email address they provided
    transitionView.result.then (willRegister) ->
      {
        emailAddress: emailAddress
        willRegister: willRegister
      }
  .then ({emailAddress, willRegister}) ->
    authModalView = new AuthModalView
      width: '500px'
      redirectTo: if willRegister then auction.registerUrl() else '/personalize'
      userData:
        email: emailAddress
  .catch ->
    window.location.reload()
  .done()