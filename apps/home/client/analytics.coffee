{ track } = require '../../../lib/analytics.coffee'

$document = $(document)

$document.on 'click', '#home-featured-artworks .grid-item', ->
  track.click 'Clicked homepage artwork'

$document.on 'click', '.is-via-personalized', ->
  track.click 'Clicked personalized homepage artwork'

$document.on 'click', '.is-via-featured', ->
  track.click 'Clicked featured homepage artwork'
