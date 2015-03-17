analytics = require '../../../lib/analytics.coffee'
track = analytics.track
trackSnowplow = analytics.snowplowStruct
$document = $(document)

module.exports = (feature) ->
  $document.on 'click', '.artwork-item-more-info', (e) ->
    track.click 'Clicked "More Info" button on artwork item from feature page'
    trackSnowplow 'more_info', 'click', $(e.currentTarget).data('id'), 'artwork'
