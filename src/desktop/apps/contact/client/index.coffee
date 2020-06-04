openMultiPageModal = require '../../../components/multi_page_modal/index.coffee'

module.exports.init = ->
  $('.js-multi-page-modal').click (e) ->
    e.preventDefault()
    openMultiPageModal $(this).data('id')
