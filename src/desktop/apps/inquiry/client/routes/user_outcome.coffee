{ INQUIRY } = require('sharify').data
{ InquiryOutcome } = require '../../../../models/inquiry_outcome'
Form = require '../../../../components/form/index.coffee'
FlashMessage = require '../../../../components/flash/index.coffee'

module.exports = ->
  inquiry = new InquiryOutcome INQUIRY
  form = new Form model: inquiry, $form: $('form')

  $('input[name=user_reported_outcome]:radio').change (e) ->
    if $('#inquiry-outcome-form-other').is(':checked')
      $('.inquiry-options-comment').show()
    else
      $('.inquiry-options-comment').hide()

  $('button').click (e) ->
    e.preventDefault()
    form.submit e,
      success: ->
        new FlashMessage message: 'Thank you for your feedback.', autoclose: false, href: '/' #redirect to homepage

      error: (model, response) =>
        new FlashMessage message: form.errors.parse response
