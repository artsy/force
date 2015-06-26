modalize = require '../modalize/index.coffee'
FlashMessage = require '../flash/index.coffee'
# We intentionally escape HTML in the template due to an XSS vulnerability.
# Consciously and manually override that here for this instance:
FlashMessage::template = -> "<span>#{@message}</span>"
InquiryQuestionnaireView = require './view.coffee'

module.exports = (options = {}) ->
  { user } = options

  questionnaire = new InquiryQuestionnaireView options

  modal = modalize questionnaire,
    className: 'modalize inquiry-questionnaire-modal'
    dimensions: width: '500px', height: '580px'

  modal.load (done) ->
    user.fetch().then ->
      if user.id?
        # We have an existing anonymous session
        # or a logged in user
        done()
      else
        # Create an anonymous session before continuing
        user.save().then done

  questionnaire.state.on 'abort', ->
    modal.close()

  questionnaire.state.on 'done', ->
    modal.close ->
      new FlashMessage message: '
        Your inquiry has been sent.<br>
        Thank you for completing your profile.
      '

  modal
