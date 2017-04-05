_ = require 'underscore'
{ underscored } = require 'underscore.string'
analyticsHooks = require '../../lib/analytics_hooks'

module.exports =
  # Select eventable objects you want to proxy
  proxy: [
    'user'
    'artwork'
    'inquiry'
    'modal'
    'collectorProfile'
    'userInterests'
    'state'
  ]

  attach: (context) ->
    trigger = (kind) -> (name) ->
      analyticsHooks.trigger "inquiry_questionnaire:#{kind}:#{name}", context

    for k, v of _.pick(context, @proxy...)
      context[k].on 'all', trigger(underscored k), this

  teardown: (context) ->
    for x, v of _.pick(context, @proxy...)
      v.off null, null, this
