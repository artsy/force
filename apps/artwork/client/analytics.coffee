analytics = require '../../../lib/analytics.coffee'
track = analytics.track
trackSnowplow = analytics.snowplowStruct

$document = $(document)

module.exports = (artwork) ->
  $document.on 'click', '.show-phone-number', ->
    track.click "Clicked 'Show phone number'"

  $document.on 'click', '.artwork-download-button', ->
    track.click 'Downloaded lo-res image'

  $document.on 'click', '.circle-icon-button-share', ->
    track.click 'Viewed sharing_is_caring form'

  $document.on 'click', '.abf-button', ->
    track.click 'Clicked "Bid" on the artwork page'
    trackSnowplow 'bid', 'click', artwork.get('_id'), 'artwork'

  $document.on 'click', '.artwork-buy-button', ->
    track.click 'Clicked "Buy" on the artwork page'

  $document.on 'click', '.artwork-partner-name', ->
    track.click 'Clicked partner name link in detail sidebar'

  $document.on 'click', '.artwork-auction-results-button', ->
    track.click "Viewed 'Comparables'"

  $document.on 'click', '#layered-search-results .artwork-item', ->
    trackSnowplow 'genome', 'click_related_artwork', artwork.get('_id'), 'artwork'

  $document.on 'click', '#artist-artworks-section .artwork-item', ->
    trackSnowplow 'artwork', 'click_artwork_by_artist', artwork.get('_id'), 'artwork'
