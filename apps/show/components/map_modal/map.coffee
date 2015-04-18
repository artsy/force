_ = require 'underscore'
sd = require('sharify').data

ModalView = require '../../../../components/modal/view.coffee'

template = -> require('./map.jade') arguments...

module.exports = class MapModal extends ModalView

  template: template

  className: 'map-modal'

  events: -> _.extend super,
    'click input': 'selectAll'

  initialize: (options) ->
    @templateData =
      test: 'WOAH'

    super

  selectAll: (e) ->
    $(e.currentTarget).select()

  postRender: ->

  remove: ->
    @shareButtonsView.remove()
    super
