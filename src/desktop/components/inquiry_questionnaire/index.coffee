_ = require 'underscore'
modalize = require '../modalize/index.coffee'
State = require '../branching_state/index.coffee'
StateView = require '../branching_state/view.coffee'
Logger = require '../logger/index.coffee'
Trail = require './trail.coffee'
{ attachInquiryAnalyticsHooks, teardownInquiryAnalyticsHooks } = require './analytics'
openErrorFlash = require './error.coffee'
sd = require('sharify').data
{ mediator } = require('../../../lib/mediator')
{ steps, decisions, views } = require './map.coffee'

module.exports = ({ user, artwork, inquiry, bypass, state_attrs, ask_specialist }) ->
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
    enableNewInquiryFlow: sd.COMMERCIAL?.enableNewInquiryFlow
    ask_specialist: ask_specialist

  # Attach/teardown analytics events
  attachInquiryAnalyticsHooks state.context
  modal.view.on 'closed', ->
    teardownInquiryAnalyticsHooks state.context

    # Dispatch a reload event to the new reaction app shell. If user has created
    # account or logged in, page will reload to sync logged in state.
    mediator.trigger('auth:login:inquiry_form:maybeReloadOnModalClose')

  # Log to both the `Logger` and the `Trail`
  log = (step) ->
    trail.log step
    logger.log step

  state
    # Log each step
    .on 'next', log

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
