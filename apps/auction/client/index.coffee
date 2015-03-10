{ AUCTION } = require('sharify').data
Auction = require '../../../models/sale.coffee'
ClockView = require '../../../components/clock/view.coffee'
SpecialistView = require '../../../components/contact/general_specialist.coffee'

module.exports.init = ->
  auction = new Auction AUCTION

  clock = new ClockView el: $('.js-auction-clock'), model: auction, modelName: 'Auction'
  clock.start()

  ($modes = $('.js-toggle-artworks-mode')).click (e) ->
    e.preventDefault()
    $modes.removeClass('is-active')
    mode = $(this).addClass('is-active').data('mode')
    $('.js-auction-artworks').attr 'data-mode', mode

  ($sorts = $('.js-toggle-artworks-sort')).click (e) ->
    e.preventDefault()
    #

  $('.js-specialist-contact-link').click (e) ->
    e.preventDefault()
    new SpecialistView
