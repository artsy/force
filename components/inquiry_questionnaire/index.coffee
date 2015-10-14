modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
State = require '../branching_state/index.coffee'
StateView = require '../branching_state/view.coffee'
Logger = require '../logger/index.coffee'
analytics = require './analytics.coffee'
openErrorFlash = require './error.coffee'
map = require './map.coffee'

module.exports = ({ user, artwork, inquiry, bypass }) ->
  { collectorProfile } = user.related()
  { userInterests } = collectorProfile.related()

  user.approximateLocation()

  # Allow us to trigger individual steps for debugging
  # by passing the named step as a `bypass` option
  map = if bypass
    _.extend {}, map, steps: [bypass]
  else
    map

  state = new State map
  logger = new Logger 'inquiry-questionnaire-log'

  questionnaire = new StateView
    state: state
    className: 'inquiry-questionnaire'

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

  # Attach/teardown analytics events
  analytics.attach state.context
  modal.view.on 'closed', ->
    analytics.teardown state.context

  # Disable backdrop clicks
  modal.view.$el.off 'click', '.js-modalize-backdrop'

  state
    # Log each step
    .on 'next', logger.log.bind(logger)

    # Abort by clicking 'nevermind'
    .on 'abort', ->
      modal.close()
      logger.reset()

    # End of complete flow
    .on 'done', ->
      # Send the inquiry immediately
      inquiry.send {},
        success: ->
          modal.close()
        error: (model, response, options) ->
          modal.close ->
            openErrorFlash response

  # Prepare the user and open the modal
  modal.load (open) ->
    user.prepareForInquiry()
      .then ->
        open()
      .catch (e) ->
        modal.close ->
          openErrorFlash e
        console.error e
      .done()

  modal
