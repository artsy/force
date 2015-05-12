{ track } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

module.exports = (user) ->
  $document = $(document)

  $document.on 'click', '.personalize-introduction-edit', ->
    track.click 'Clicked "Edit" on introduction step of personalize flow'

  mediator.on 'follow-button:follow', ($el, model) ->
    if (label = $el.data 'analyticsLabel')?
      track.click "Followed artist from personalize #{label}"

  mediator.on 'follow-button:unfollow', ($el, model) ->
    if (label = $el.data 'analyticsLabel')?
      track.click "Unfollowed artist from personalize #{label}"

  user.on 'change:name', (model, value, options) ->
    track.funnel 'Changed name on introduction step of personalize flow'
