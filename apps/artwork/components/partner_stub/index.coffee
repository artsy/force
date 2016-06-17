module.exports = ($el) ->
  $el
    .find '.js-artwork-partner-stub-phone-toggle'
    .click (e) ->
      e.preventDefault()

      $(this).hide()

      $el
        .find '.js-artwork-partner-stub-phone-toggleable'
        .show()
