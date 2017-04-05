_ = require 'underscore'
ModalView = require '../../../components/modal/view'
CurrentUser = require '../../../models/current_user'
template = -> require('../templates/modal.jade') arguments...
imagesLoaded = require 'imagesloaded'

module.exports = class DetailView extends ModalView
  template: template

  className: 'auction-result-detail-modal'

  events: -> _.extend super,
    # Disable zoom
    'click .auction-lot-image-zoom': -> false

  initialize: (options) ->
    @templateData =
      lot: options.lot
      artist: options.artist
      user: CurrentUser.orNull()
    super

  postRender: ->
    $metaData = @$('.ard-metadata')
    $image = @$('.auction-lot-image-zoom')
    $image.css opacity: 0
    @$el.imagesLoaded().done =>
      @updatePosition() if $image.height() > $metaData.height()
      $image.css opacity: 1
