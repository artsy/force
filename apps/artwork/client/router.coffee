Backbone        = require 'backbone'
ArtworkView     = require './view.coffee'
DeepZoomView    = require './deep-zoom.coffee'
ViewInRoomView  = require './view-in-room.coffee'
analytics       = require '../../../lib/analytics.coffee'
mediator        = require '../../../lib/mediator.coffee'

ContactPartnerView    = require '../../../components/contact/contact_partner.coffee'
InquiryView           = require '../../../components/contact/inquiry.coffee'

module.exports = class ArtworkRouter extends Backbone.Router
  routes:
    'artwork/:id'                 : 'show'
    'artwork/:id/zoom'            : 'zoom'
    'artwork/:id/more-info'       : 'moreInfo'
    'artwork/:id/view-in-room'    : 'viewInRoom'
    'artwork/:id/contact-gallery' : 'contactPartner'
    'artwork/:id/inquire'         : 'inquire'

  initialize: (options) ->
    { @artwork, @artist } = options
    @baseView = new ArtworkView el: $('#artwork-page'), artwork: @artwork, artist: @artist

  show: ->
    @_teardown()
    @baseView.route 'show'

  zoom: ->
    @_teardown()
    analytics.track.click 'Clicked to zoom in on artwork'
    @baseView.route 'zoom'
    @view = new DeepZoomView $container: $('#artwork-deep-zoom-container'), artwork: @artwork
    @view.render()

  moreInfo: ->
    @_teardown()
    return unless @artwork.hasMoreInfo()
    analytics.track.click "Viewed 'More Info'"
    @baseView.route 'more-info'

  viewInRoom: ->
    @_teardown()
    analytics.track.click "Entered 'View In Room'"
    @baseView.route 'view-in-room'
    @view = new ViewInRoomView $container: $('#artwork-view-in-room-container'), $img: $('#the-artwork-image'), artwork: @artwork
    @view.render()

  contactPartner: ->
    @_teardown()
    new ContactPartnerView artwork: @artwork, partner: @artwork.get('partner')
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  inquire: ->
    @_teardown()
    new InquiryView artwork: @artwork
    mediator.on 'modal:closed', => Backbone.history.navigate(@artwork.href(), trigger: true, replace: true)

  _teardown: ->
    @view?.remove()
