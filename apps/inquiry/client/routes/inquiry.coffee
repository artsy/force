_ = require 'underscore'
{ ARTWORK } = require('sharify').data
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
State = require '../../../../components/branching_state/index.coffee'
StateView = require '../../../../components/branching_state/view.coffee'
openErrorFlash = require '../../../../components/inquiry_questionnaire/error.coffee'
Logger = require '../../../../components/logger/index.coffee'
{ steps, decisions, views } = require '../map.coffee'

module.exports = (id, bypass) ->
  steps = [bypass] if bypass and _.contains(_.keys(views), bypass)

  $el = $('.js-embedded-inquiry')

  user = User.instantiate()
  artwork = new Artwork ARTWORK
  inquiry = new ArtworkInquiry artwork: artwork.id

  { collectorProfile } = user.related()
  { userInterests } = collectorProfile.related()

  user.approximateLocation()

  state = new State steps: steps, decisions: decisions
  logger = new Logger 'inquiry-questionnaire-log'

  state.inject
    user: user
    artwork: artwork
    inquiry: inquiry
    logger: logger
    collectorProfile: collectorProfile
    userInterests: userInterests
    state: state

  # To do: analytics

  state
    .on 'next', (step) ->
      logger.log step
      window.scrollTo 0, 0

    # Abort by clicking 'nevermind'
    .on 'abort', ->
      logger.reset()

    # End of complete flow
    .on 'done', ->
      # Send the inquiry immediately
      inquiry.send {},
        success: ->
          location.href = artwork.href()
        error: (model, response, options) ->
          openErrorFlash response

  questionnaire = new StateView
    className: 'inquiry-questionnaire'
    state: state
    views: views

  $el.html questionnaire.$el

  user.prepareForInquiry()
    .then ->
      questionnaire.render()
    .catch (e) ->
      openErrorFlash e
      console.error e
    .done()

  questionnaire
