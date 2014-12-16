{ track, trackTimeTo } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports.trackArtistPageView = (artist) ->
  track.impression 'Artist page', id: artist.id

module.exports.listenToEvents = ->
  mediator.on 'carousel:images:loaded', -> trackTimeTo 'Artist page / carousel images loaded'
  mediator.on 'related:genes:render', -> trackTimeTo 'Artist page / above the fold rendered'
  mediator.on 'overview:fetches:complete', -> trackTimeTo 'Artist page / page render complete'

