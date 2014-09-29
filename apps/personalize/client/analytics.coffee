{ track } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (user) ->
  $document = $(document)

  $document.on 'click', '.personalize-introduction-edit', ->
    track.click 'Clicked "Edit" on introduction step of personalize flow'

  # The location view published twice due to some workarounds for Google's geo-autocomplete events
  # It's a safe assumption to say we are only interested in the first time it happens
  mediator.once 'location:update', (location) ->
    if location.name is ''
      track.funnel 'Deleted location on introduction step of personalize flow'
    else
      track.funnel 'Changed location on introduction step of personalize flow'

  mediator.on 'follow-button:follow', ($el, model) ->
    if (label = $el.data 'analyticsLabel')?
      track.click "Followed artist from personalize #{label}"

  mediator.on 'follow-button:unfollow', ($el, model) ->
    if (label = $el.data 'analyticsLabel')?
      track.click "Unfollowed artist from personalize #{label}"

  user.on 'change:name', (model, value, options) ->
    track.funnel 'Changed name on introduction step of personalize flow'
