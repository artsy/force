{ MAILCHIMP_AUCTION_LIST_ID } = require('sharify').data
ThankYouView = require './thank_you_view.coffee'
EmailView = require '../../../components/email/view.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
modalize = require '../../../components/modalize/index.coffee'

module.exports = (auction) ->
  emailView = new EmailView
    el: $('.auction-preview-sidebar-email')
    listId: MAILCHIMP_AUCTION_LIST_ID
    buttonText: 'Notify me'
    autofocus: true
    mergeVars:
      "AUCTION_#{auction.id}": true

  emailView.result
  .then (emailAddress) ->
    # Trigger analytics event
    analyticsHooks.trigger 'auction:notify-me', { email: emailAddress }

    # Open "Thank You" modal
    thankYouView = new ThankYouView
    modal = modalize thankYouView, dimensions: width: '400px'
    thankYouView.on 'done', -> modal.close()
    modal.open()

    # Bundle together the user will make in the view
    # with the email address they provided
    thankYouView.result.then (willRegister) ->
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
  .catch (err, response)->
    window.location.reload()
  .done()

  # adds handling for clicking "register now"
  $('.auction-preview-register-now a').click (e)->
    e.preventDefault()
    authModalView = new AuthModalView
      width: '500px'
      redirectTo: auction.registerUrl()
