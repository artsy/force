openMultiPageModal = require '../../../components/multi_page_modal/index.coffee'
openSpecialistModal = require '../../../components/simple_contact/specialist.coffee'
openFeedbackModal = require '../../../components/feedback_modal/index.coffee'

module.exports.init = ->
  $('.js-contact-specialist').click (e) ->
    e.preventDefault()
    openSpecialistModal()

  $('.js-contact-feedback').click (e) ->
    e.preventDefault()
    openFeedbackModal()

  $('.js-multi-page-modal').click (e) ->
    e.preventDefault()
    openMultiPageModal $(this).data('id')
