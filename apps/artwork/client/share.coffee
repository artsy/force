_   = require 'underscore'
sd  = require('sharify').data

ModalView         = require '../../../components/modal/view.coffee'
ShareButtonsView  = require '../../../components/share/view.coffee'

template = -> require('../templates/share.jade') arguments...

module.exports = class ShareView extends ModalView
  template: template

  className: 'artwork-share-modal'

  initialize: (options) ->
    { @artwork } = options

    @templateData =
      url: encodeURIComponent(sd.ARTSY_URL + sd.CURRENT_PATH)
      media: @artwork.defaultImageUrl('large')
      description: @artwork.toAltText()

    super

  postRender: ->
    @shareButtonsView = new ShareButtonsView el: @$('.artwork-share-menu-buttons')

  remove: ->
    @shareButtonsView.remove()
    super
