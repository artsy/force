{ map } = require 'underscore'
Backbone = require 'backbone'
{ APP_URL, CURRENT_PATH } = require('sharify').data
template = -> require('./index.jade') arguments...

module.exports = class ShareView extends Backbone.View
  className: 'share-menu'

  events:
    'click .js-pop-up': 'popUp'
    'click input': 'selectAll'

  initialize: ({ description, media, url }) ->
    @data =
      url: encodeURIComponent url or APP_URL + CURRENT_PATH
      media: encodeURIComponent media
      description: encodeURIComponent description

  popUp: (e) ->
    e.preventDefault()

    $target = $(e.currentTarget)
    $window = $(window)

    wLeft = window?.screenLeft or window.screenX
    wTop = window?.screenTop or window.screenY

    options = map
      status: 1
      width: width = 750
      height: height = 400
      top: (wTop + ($window.height() / 2) - (height / 2)) or 0
      left: (wLeft + ($window.width() / 2) - (width / 2)) or 0
    , (v, k) -> "#{k}=#{v}"
      .join ','

    window.open $target.attr('href'), $target.data('service'), options

    options

  selectAll: (e) ->
    $(e.currentTarget).select()

  render: ->
    @$el.html template @data
    this
