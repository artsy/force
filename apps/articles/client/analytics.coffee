analytics = require '../../../lib/analytics.coffee'

$('.articles-social:eq(0) > a').click ->
  analytics.track.click 'Clicked Article Share',
    position: 'top'
    service: $(this).attr 'data-service'

$('.articles-social:eq(1) > a').click ->
  analytics.track.click 'Clicked Article Share',
    position: 'bottom'
    service: $(this).attr 'data-service'