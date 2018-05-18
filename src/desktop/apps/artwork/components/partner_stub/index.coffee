InquireViaPhoneModalView = require '../inquire_via_phone/index.coffee'
mediator = require '../../../../lib/mediator'

module.exports = ($el) ->
  $el
    .find '.js-artwork-partner-stub-inquire-via-phone'
    .click (e) ->
      e.preventDefault()
      @modal = mediator.trigger 'open:auth', {
        width: '500px',
        context: 'show phone number',
        mode: 'signup',
        copy:
          login: 'Log in to Artsy to call gallery',
          signup: 'Create an Artsy account to call gallery',
          register: 'Create an Artsy account to call gallery',
        artistIds: JSON.parse(e.currentTarget.getAttribute('data-artist_ids')),
        userData:
          partner: JSON.parse(e.currentTarget.getAttribute('data-partner'))
      }
  $el
    .find '.js-artwork-partner-stub-phone-toggle'
    .click (e) ->
      e.preventDefault()
      $(this).hide()
      $el
        .find '.js-artwork-partner-stub-phone-toggleable'
        .show()
