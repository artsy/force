{ track } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (feature) ->
  $document = $(document)

  mediator.on 'auth:sign_up:success', ->
    track.submit 'Successful registration on auction feature page'

  $('.js-register-button').click ->
    track.click 'Clicked "Register to bid" on the auction feature page'

  $document.on 'click', '.js-bid-button', (e) ->
    track.click 'Clicked "Bid" button on artwork item from auction feature page'
