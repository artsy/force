{ track, trackTimeTo } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (artist) ->
  track.impression 'Artist page', id: artist.id

  mediator.on 'carousel:images:loaded', ->
    trackTimeTo 'Artist page / carousel images loaded'

  mediator.on 'related:genes:render', ->
    trackTimeTo 'Artist page / above the fold rendered'

  mediator.on 'overview:fetches:complete', ->
    trackTimeTo 'Artist page / page render complete'
