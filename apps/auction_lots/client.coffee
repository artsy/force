ZoomView            = require '../../components/modal/zoom.coffee'
mediator            = require '../../lib/mediator.coffee'
ShareView           = require '../../components/share/view.coffee'
{ isTouchDevice }   = require '../../components/util/device.coffee'

Backbone = require 'backbone'

module.exports.AuctionResultsView = class AuctionResultsView extends Backbone.View
  initialize: (options) ->
    @setupShareButtons()
    @touchAdjustments() if isTouchDevice()

  events:
    'click .auction-lot-image-zoom'  : 'zoomImage'
    'click .auction-lot-sale-signup' : 'signUp'

  setupShareButtons: ->
    new ShareView el: @$('.artist-share')

  touchAdjustments: ->
    @$('.bordered-pulldown').on 'click', -> $(this).trigger 'hover'

  zoomImage: (e) ->
    e.preventDefault()
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signUp: (e) ->
    e.preventDefault()
    # Use login until signup form works
    mediator.trigger 'open:auth', { mode: 'login' }

module.exports.init = ->
  $ ->
    new AuctionResultsView el: $('body')
