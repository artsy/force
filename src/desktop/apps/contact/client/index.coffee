openMultiPageModal = require '../../../components/multi_page_modal/index.coffee'
openFeedbackModal = require '../../../components/feedback_modal/index.coffee'

module.exports.init = ->
  $('.js-contact-feedback').click (e) ->
    e.preventDefault()
    openFeedbackModal()

  $('.js-multi-page-modal').click (e) ->
    e.preventDefault()
    openMultiPageModal $(this).data('id')
