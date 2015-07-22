modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
# We intentionally escape HTML in the template due to an XSS vulnerability.
# Consciously and manually override that here for this instance:
FlashMessage::template = -> "<span>#{@message}</span>"
InquiryQuestionnaireView = require './view.coffee'
analytics = require './analytics.coffee'

module.exports = (options = {}) ->
  { user } = options

  questionnaire = new InquiryQuestionnaireView options
  modal = modalize questionnaire,
    className: 'modalize inquiry-questionnaire-modal'
    dimensions: width: '500px', height: '580px'

  # Attach/teardown analytics events
  analytics.attach modal
  modal.view.on 'closed', ->
    analytics.teardown modal

  # Disable backdrop clicks
  modal.view.$el.off 'click', '.js-modalize-backdrop'

  modal.load (done) ->
    # Try to get a location incase one doesn't exist,
    # don't wait for it though
    user.approximateLocation()
    user.instantiate()
      .then -> user.related().collectorProfile.instantiate()
      .then done

  # Abort by clicking 'nevermind'
  questionnaire.state.on 'abort', ->
    modal.close()

  # End of complete flow
  questionnaire.state.on 'done', ->
    modal.close ->
      new FlashMessage message: '
        Your inquiry has been sent.<br>
        Thank you for completing your profile.
      '

  modal
