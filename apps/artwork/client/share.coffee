_   = require 'underscore'
sd  = require('sharify').data

ModalView         = require '../../../components/modal/view.coffee'
ShareButtonsView  = require '../../../components/share/view.coffee'

template = -> require('../templates/share.jade') arguments...

module.exports = class ShareView extends ModalView
  template: template

  className: 'artwork-share-modal'

  events: -> _.extend super,
    'click input': 'selectAll'

  initialize: (options) ->
    { @artwork } = options

    @templateData =
      url: encodeURIComponent sd.APP_URL + sd.CURRENT_PATH
      media: encodeURIComponent @artwork.defaultImageUrl('large')
      description: encodeURIComponent @artwork.toAltText()

    super

  selectAll: (e) ->
    $(e.currentTarget).select()

  postRender: ->
    @shareButtonsView = new ShareButtonsView el: @$('.artwork-share-menu-buttons')

  remove: ->
    @shareButtonsView.remove()
    super
