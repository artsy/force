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
    track.click "Followed artist from personalize #{$el.data 'analyticsLabel'}"

  mediator.on 'follow-button:unfollow', ($el, model) ->
    track.click "Unfollowed artist from personalize #{$el.data 'analyticsLabel'}"

  user.on 'change:name', (model, value, options) ->
    track.funnel 'Changed name on introduction step of personalize flow'
