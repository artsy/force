{ track } = require '../../lib/analytics.coffee'

$el = $('#artwork-section')

$el.on 'click', '.artwork-filter-select', ->
  track.click 'Selected an artist artwork filter'

$el.on 'click', '.artwork-filter-remove', ->
  track.click 'Manually cleared an artist artwork filter'

$el.on 'click', '#for-sale', ->
  track.click 'Toggled "Only For Sale" artist artwork filter'

$el.on 'click', '#artwork-see-more', ->
  track.click 'Clicked "See More" for artist artwork filter results'
