modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
InquiryQuestionnaireView = require './view.coffee'
analytics = require './analytics.coffee'
openErrorFlash = require './error.coffee'

closeWithError = (modal, xhr) ->
  modal.close ->
    openErrorFlash xhr

closeWithSuccess = (modal) ->
  modal.close ->
    new FlashMessage safe: false, message: '
      Your inquiry has been sent.<br>
      Thank you for completing your profile.
    '

module.exports = (options = {}) ->
  { user, inquiry } = options

  questionnaire = new InquiryQuestionnaireView options
  modal = modalize questionnaire,
    className: 'modalize inquiry-questionnaire-modal'
    dimensions: width: '500px', height: '640px'

  # Try to get a location incase one doesn't exist
  # Don't bother waiting for it
  user.approximateLocation()

  # Attach/teardown analytics events
  analytics.attach modal
  modal.view.on 'closed', ->
    analytics.teardown modal

  # Disable backdrop clicks
  modal.view.$el.off 'click', '.js-modalize-backdrop'

  # Prevent escape
  $(window).on 'beforeunload', ->
    'Your inquiry has not been sent yet.'
  modal.view.on 'closed', ->
    $(window).off 'beforeunload'

  modal.load (done) ->
    { collectorProfile } = user.related()

    user.findOrCreate silent: true
      .then ->
        collectorProfile.findOrCreate silent: true
      .then ->
        collectorProfile.related().userFairActions.invoke 'save'
        done()
      .catch (e) ->
        closeWithError modal
        console.error e
      .done()

  # Abort by clicking 'nevermind'
  questionnaire.state.on 'abort', ->
    modal.close()

  # End of complete flow
  questionnaire.state.on 'done', ->
    # Send the inquiry
    inquiry.save {},
      error: (model, response, options) ->
        closeWithError modal, response
      success: ->
        closeWithSuccess modal

  modal
