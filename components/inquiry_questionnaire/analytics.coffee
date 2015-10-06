{ underscored } = require 'underscore.string'
analyticsHooks = require '../../lib/analytics_hooks.coffee'

module.exports =
  context: (modal) ->
    { user, artwork, inquiry, state } = modal.subView
    { collectorProfile } = user.related()
    { userInterests } = collectorProfile.related()

    modal: modal.view
    user: user
    artwork: artwork
    inquiry: inquiry
    collectorProfile: collectorProfile
    userInterests: userInterests
    state: state

  attach: (modal) ->
    context = @context modal

    trigger = (kind) -> (name) ->
      analyticsHooks.trigger "inquiry_questionnaire:#{kind}:#{name}", context

    for k, v of context
      context[k].on 'all', trigger(underscored k), this

  teardown: (modal) ->
    for x, v of @context modal
      v.off null, null, this
