modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
InquiryQuestionnaireView = require './view.coffee'
analytics = require './analytics.coffee'
openErrorFlash = require './error.coffee'

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

  # Abort by clicking 'nevermind'
  questionnaire.state.on 'abort', ->
    modal.close()
    modal.subView.logger.reset()

  # End of complete flow
  questionnaire.state.on 'done', ->
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
