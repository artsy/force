_ = require 'underscore'
sd = require('sharify').data

ModalView = require '../modal/view.coffee'
ShareButtonsView = require './view.coffee'

template = -> require('./modal.jade') arguments...

module.exports = class ShareModal extends ModalView
  template: template

  className: 'share-modal'

  events: -> _.extend super,
    'click input': 'selectAll'

  initialize: (options) ->
    { media, description } = options

    @templateData =
      url: encodeURIComponent sd.APP_URL + sd.CURRENT_PATH
      media: encodeURIComponent media
      description: encodeURIComponent description

    super

  selectAll: (e) ->
    $(e.currentTarget).select()

  postRender: ->
    @shareButtonsView = new ShareButtonsView el: @$('.share-menu-buttons')

  remove: ->
    @shareButtonsView.remove()
    super
