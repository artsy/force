{ track } = require '../../../lib/analytics.coffee'

module.exports = (artist) ->
  track.impression 'Artist page', id: artist.id
