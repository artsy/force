_ = require 'underscore'
attachFastClick = -> require('fastclick') arguments...
{ ARTWORK } = require('sharify').data
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
State = require '../../../../components/branching_state/index.coffee'
StateView = require '../../../../components/branching_state/view.coffee'
openErrorFlash = require '../../../../components/inquiry_questionnaire/error.coffee'
Logger = require '../../../../components/logger/index.coffee'
Trail = require '../../../../components/inquiry_questionnaire/trail.coffee'
analytics = require '../../../../components/inquiry_questionnaire/analytics.coffee'
{ steps, decisions, views } = require '../map.coffee'

module.exports = (id, bypass) ->
  attachFastClick document.body

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
  trail = new Trail

  state.inject
    user: user
    artwork: artwork
    inquiry: inquiry
    logger: logger
    collectorProfile: collectorProfile
    userInterests: userInterests
    state: state
    trail: trail

  analytics.attach state.context

  state
    .on 'next', (step) ->
      trail.log step
      logger.log step
      window.scrollTo 0, 0

    # Abort by clicking 'nevermind'
    .on 'abort', ->
      logger.reset()
      location.href = artwork.href()

    # End of complete flow
    .on 'done', ->
      if inquiry.send?
        # Send the inquiry immediately
        inquiry.send {},
          success: ->
            location.href = artwork.href()
          error: (model, response, options) ->
            openErrorFlash response
      else
        location.href = artwork.href()

  questionnaire = new StateView
    className: 'inquiry-questionnaire'
    state: state
    views: views

  $el.html questionnaire.$el

  user.prepareForInquiry()
    .then ->
      trail.log state.current()
      logger.log state.current()
      questionnaire.render()
    .catch (e) ->
      openErrorFlash e
      console.error e

  questionnaire
