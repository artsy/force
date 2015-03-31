_ = require 'underscore'
{ track, snowplowStruct } = require '../../../lib/analytics.coffee'

module.exports = (router) ->
  { state, form } = router

  sendToSnowplow = (action) ->
    contexts = _.extend {}, state.attributes, form.pick('name', 'first_name', 'last_name')
    snowplowStruct 'partner_application', action, null, 'partner_application', null, contexts

  track.funnel 'Landed on partner application form', state.attributes
  sendToSnowplow 'landed'

  router.on 'route', (route) ->
    track.funnel 'Changed partner application route', _.extend(route: route, state.attributes)

  state.on 'change:mode', (state, mode) ->
    track.funnel 'Partner application mode changed', state.attributes
    sendToSnowplow 'mode_changed'

  state.on 'change:step', (state, step) ->
    track.funnel 'Partner application step changed', state.attributes
    sendToSnowplow 'step_changed'

  state.on 'change:state', (state, value) ->
    track.funnel 'Submitted partner application form', state.attributes
    sendToSnowplow 'submitted_form'

  $(document).on 'click', '.paf-submit', ->
    track.funnel 'Clicked submit button on partner application form', state.attributes
    sendToSnowplow 'clicked_submit'

  $(document).on 'click', '.paf-next', ->
    track.funnel 'Clicked next button on partner application form', state.attributes
    sendToSnowplow 'clicked_next'
