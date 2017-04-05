
analyticsHooks = require '../../../../lib/analytics_hooks'

module.exports = (user) ->
  user.on 'change:name', (model, value, options) ->
    analyticsHooks.trigger 'current_user:changed-name'
