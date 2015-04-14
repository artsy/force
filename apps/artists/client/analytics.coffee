{ track } = require '../../../lib/analytics.coffee'

module.exports = ->
  $('.afc-next').click ->
    track.click 'Next page in /artists carousel'

  $('.afc-prev').click ->
    track.click 'Previous page in /artists carousel'
