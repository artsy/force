openMultiPageModal = require '../../../components/multi_page_modal/index.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'
FeebackView = require '../../../components/contact/feedback.coffee'

module.exports.init = ->
  $('.js-contact-specialist').click (e) ->
    e.preventDefault()
    new SpecialistView

  $('.js-contact-feedback').click (e) ->
    e.preventDefault()
    new FeebackView

  $('.js-multi-page-modal').click (e) ->
    e.preventDefault()
    openMultiPageModal $(this).data('id')
