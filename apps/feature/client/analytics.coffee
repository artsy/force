analytics = require '../../../lib/analytics.coffee'
track = analytics.track
mediator = require '../../../lib/mediator.coffee'
$document = $(document)

module.exports = (feature) ->
  $document.on 'click', '.js-register-button', (e) ->
    track.click 'Clicked "Register to bid" on the auction feature page'

  mediator.on 'auth:sign_up:success', ->
    track.submit 'Successful registration on auction feature page'

  $document.on 'click', '.js-bid-button', (e) ->
    track.click 'Clicked "Bid" button on artwork item from auction feature page'

  $document.on 'click', '.artwork-item-more-info', (e) ->
    track.click 'Clicked "More Info" button on artwork item from feature page'
