analytics = require '../../../lib/analytics.coffee'
track = analytics.track

$document = $(document)

$document.on 'click', '.show-phone-number', ->
  track.click "Clicked 'Show phone number'"
