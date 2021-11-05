{ openMultiPage } = require '../../../components/multi_page/index'
{ ModalView } = require '../../../components/modal/view'
{ mediator } = require '../../../../lib/mediator'
{ bootstrap } = require '../../../components/layout/bootstrap'
{ markdown } = require  '../../../components/util/markdown'
sd = require('sharify').data
bidIncrements = require '../bid_increments.coffee'
CurrentUser = require '../../../models/current_user'
template = -> require('../templates/learn_more.jade') arguments...

module.exports.init = ->
  bootstrap()

  multiPage = openMultiPage 'auction-faqs'
  multiPage.collection.invoke 'fetch'

  $('.haw-page-faqs').html multiPage.$el

  mediator.on 'scrollto:element', ({ $targetDiv }) ->
    offset = $('#main-header-search-box').outerHeight()
    $('body').scrollTop $targetDiv.position().top + offset

  $('.js-haw-learn-more').click (e) ->
    modal = new ModalView
    modal.render()
    $('body').append modal.$el

    modal.insertModalContent template
      page: sd.HOW_AUCTIONS_WORK
      markdown: markdown
      bidIncrements: bidIncrements
      user: CurrentUser.orNull()

  $('body').on 'click', '.learn-more__description a', (e)->
    mediator.trigger 'modal:close'

