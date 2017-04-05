openMultiPageModal = require '../../../components/multi_page_modal/index'
openFeedbackModal = require '../../../components/feedback_modal/index'

module.exports.init = ->
  $('.js-contact-feedback').click (e) ->
    e.preventDefault()
    openFeedbackModal()

  $('.js-multi-page-modal').click (e) ->
    e.preventDefault()
    openMultiPageModal $(this).data('id')
