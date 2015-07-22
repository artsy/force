{ underscored } = require 'underscore.string'
analyticsHooks = require '../../lib/analytics_hooks.coffee'

module.exports =
  context: (modal) ->
    { state, user, artwork } = modal.subView
    { collectorProfile } = user.related()
    { userInterests } = collectorProfile.related()

    # Export a hash of objects to listen to
    # + pass into event handlers
    {
      modal: modal.view
      state: state
      user: user
      artwork: artwork
      collectorProfile: collectorProfile
      userInterests: userInterests
    }

  attach: (modal) ->
    context = @context modal

    trigger = (kind) -> (name) ->
      analyticsHooks.trigger "inquiry_questionnaire:#{kind}:#{name}", context

    for k, v of context
      context[k].on 'all', trigger(underscored k), this

  teardown: (modal) ->
    for x, v of @context modal
      v.off null, null, this
