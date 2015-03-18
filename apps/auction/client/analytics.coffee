{ track, snowplowStruct } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (feature) ->
  $document = $(document)

  mediator.on 'auth:sign_up:success', ->
    track.submit 'Successful registration on auction feature page'
    snowplowStruct 'auction_registration', 'submit', feature.get('_id'), 'feature'

  $('.js-register-button').click ->
    track.click 'Clicked "Register to bid" on the auction feature page'
    snowplowStruct 'auction_registration', 'click', feature.get('_id'), 'feature'

  $document.on 'click', '.js-bid-button', (e) ->
    track.click 'Clicked "Bid" button on artwork item from auction feature page'
    snowplowStruct 'bid', 'click', $(e.currentTarget).data('id'), 'artwork'
