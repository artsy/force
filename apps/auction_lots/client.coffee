Backbone            = require 'backbone'
ZoomView            = require '../../components/modal/zoom.coffee'
mediator            = require '../../lib/mediator.coffee'
CurrentUser         = require '../../models/current_user.coffee'
Artist              = require '../../models/artist.coffee'
sd                  = require('sharify').data
{ isTouchDevice }   = require '../../components/util/device.coffee'

module.exports.AuctionResultsView = class AuctionResultsView extends Backbone.View
  initialize: (options) ->
    @touchAdjustments() if isTouchDevice()

  events:
    'click .auction-lot-image-zoom'     : 'zoomImage'
    'click .auction-lot-sale-signup'    : 'signUp'
    'click .auction-lots-feedback-link' : 'feedback'

  touchAdjustments: ->
    @$('.bordered-pulldown').on 'click', -> $(this).trigger 'hover'

  zoomImage: (e) ->
    e.preventDefault()
    new ZoomView imgSrc: $(e.currentTarget).attr 'href'

  signUp: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to see sale price' }

  feedback: (e) ->
    e.preventDefault()
    mediator.trigger 'open:feedback'

module.exports.init = ->
  $ ->
    new AuctionResultsView
      el: $('body')
      model: new Artist sd.ARTIST
