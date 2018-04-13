_ = require 'underscore'
modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
State = require '../branching_state/index.coffee'
StateView = require '../branching_state/view.coffee'
Logger = require '../logger/index.coffee'
Trail = require './trail.coffee'
analytics = require './analytics.coffee'
openErrorFlash = require './error.coffee'
{ steps, decisions, views } = require './map.coffee'

module.exports = ({ user, artwork, inquiry, bypass, state_attrs }) ->
  { collectorProfile } = user.related()
  { userInterests } = collectorProfile.related()

  user.approximateLocation()

  # Allow us to trigger individual steps for debugging
  # by passing the named step as a `bypass` option
  steps = bypass if bypass

  state = new State _.extend {
    steps,
    decisions
  }, state_attrs

  logger = new Logger 'inquiry-questionnaire-log'
  trail = new Trail

  questionnaire = new StateView
    className: 'inquiry-questionnaire'
    state: state
    views: views

  modal = modalize questionnaire,
    className: 'modalize inquiry-questionnaire-modal'
    dimensions: width: '500px', height: '640px'

  state.inject
    user: user
    artwork: artwork
    inquiry: inquiry
    logger: logger
    modal: modal.view
    collectorProfile: collectorProfile
    userInterests: userInterests
    trail: trail

  # Attach/teardown analytics events
  analytics.attach state.context
  modal.view.on 'closed', ->
    analytics.teardown state.context

  # Log to both the `Logger` and the `Trail`
  log = (step) ->
    trail.log step
    logger.log step

  state
    # Log each step
    .on 'next', log

    # Abort by clicking 'nevermind'
    .on 'abort', ->
      modal.close()
      logger.reset()
      trail.reset()

    # End of complete flow
    .on 'done', ->

      if inquiry.send?
        # Send the inquiry immediately
        inquiry.send {},
          success: ->
            modal.close()
          error: (model, response, options) ->
            modal.close ->
              openErrorFlash response
      else
        modal.close()

  # Prepare the user and open the modal
  modal.load (open) ->
    user.prepareForInquiry()
      .then ->
        log state.current()
        open()
      .catch (e) ->
        modal.close ->
          openErrorFlash e
        console.error e, e.stack

  modal
