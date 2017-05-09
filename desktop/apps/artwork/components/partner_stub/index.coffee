InquireViaPhoneModalView = require './components/inquire_via_phone_modal.coffee'

module.exports = ($el) ->
  $el
    .find '.js-artwork-partner-stub-inquire-via-phone'
    .click (e) ->
      e.preventDefault()
      @modal = new InquireViaPhoneModalView
        width: '500px'
        copy:
          login: 'Log in to Artsy to call gallery'
          signup: 'Create an Artsy account to call gallery'
          register: 'Create an Artsy account to call gallery'
        userData:
          partner: JSON.parse(e.toElement.dataset.partner)
  $el
    .find '.js-artwork-partner-stub-phone-toggle'
    .click (e) ->
      e.preventDefault()
      $(this).hide()
      $el
        .find '.js-artwork-partner-stub-phone-toggleable'
        .show()
