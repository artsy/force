analytics = require '../../../lib/analytics.coffee'
track = analytics.track
trackSnowplow = analytics.snowplowStruct
mediator = require '../../../lib/mediator.coffee'
$document = $(document)

module.exports = (feature) ->
  $document.on 'click', '.js-register-button', (e) ->
    track.click 'Clicked "Register to bid" on the auction feature page'
    trackSnowplow 'auction_registration', 'click', feature.get('_id'), 'feature'

  mediator.on 'auth:sign_up:success', ->
    track.submit 'Successful registration on auction feature page'
    trackSnowplow 'auction_registration', 'submit', feature.get('_id'), 'feature'

  $document.on 'click', '.js-bid-button', (e) ->
    track.click 'Clicked "Bid" button on artwork item from auction feature page'
    trackSnowplow 'bid', 'click', $(e.currentTarget).data('id'), 'artwork'

  $document.on 'click', '.artwork-item-more-info', (e) ->
    track.click 'Clicked "More Info" button on artwork item from feature page'
    trackSnowplow 'more_info', 'click', $(e.currentTarget).data('id'), 'artwork'
