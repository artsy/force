modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
# We intentionally escape HTML in the template due to an XSS vulnerability.
# Consciously and manually override that here for this instance:
FlashMessage::template = -> "<span>#{@message}</span>"
InquiryQuestionnaireView = require './view.coffee'
analytics = require './analytics.coffee'

closeWithError = (modal) ->
  modal.close ->
    new FlashMessage
      message: 'There has been an error. Click here to contact support@artsy.net'
      href: 'mailto:support@artsy.net'
      autoclose: false

closeWithSuccess = (modal) ->
  modal.close ->
    new FlashMessage message: '
      Your inquiry has been sent.<br>
      Thank you for completing your profile.
    '

module.exports = (options = {}) ->
  { user, inquiry } = options

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

    user.findOrCreate()
      .then ->
        user.related().collectorProfile.findOrCreate()
      .then done
      .fail ->
        closeWithError modal
      .done()

  # Abort by clicking 'nevermind'
  questionnaire.state.on 'abort', ->
    modal.close()

  # End of complete flow
  questionnaire.state.on 'done', ->
    # Send the inquiry
    inquiry.save {},
      error: ->
        closeWithError modal
      success: ->
        closeWithSuccess modal

  modal
