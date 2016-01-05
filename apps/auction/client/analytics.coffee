mediator = require '../../../lib/mediator.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'

module.exports = (feature) ->
  mediator.on 'auth:sign_up:success', ->
    analyticsHooks.trigger 'auction:sign_up:success'

