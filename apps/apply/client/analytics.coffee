_ = require 'underscore'
{ track, snowplowStruct } = require '../../../lib/analytics.coffee'

module.exports = (router) ->
  { state, form } = router

  track.funnel 'Landed on partner application form', state.attributes

  router.on 'route', (route) ->
    track.funnel 'Changed partner application route', _.extend(route: route, state.attributes)

  state.on 'change:mode', (state, mode) ->
    track.funnel 'Partner application mode changed', state.attributes

  state.on 'change:step', (state, step) ->
    track.funnel 'Partner application step changed', state.attributes

  state.on 'change:state', (state, value) ->
    track.funnel 'Submitted partner application form', state.attributes
    snowplowStruct 'partner_application', 'submit', null, 'partner_application', null, _.extend({}, state.pick('mode'), form.pick('name', 'first_name', 'last_name'))

  $(document).on 'click', '.paf-submit', ->
    track.funnel 'Clicked submit button on partner application form', state.attributes

  $(document).on 'click', '.paf-next', ->
    track.funnel 'Clicked next button on partner application form', state.attributes
