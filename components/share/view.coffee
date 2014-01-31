_         = require 'underscore'
Backbone  = require 'backbone'

module.exports = class ShareView extends Backbone.View
  events:
    'click a': 'popUp'

  # Pops up the URL and centers the crap out of it
  popUp: (e) ->
    e.preventDefault()

    width     = 750
    height    = 400
    $target   = $(e.currentTarget)
    $window   = $(window)
    wLeft     = window?.screenLeft or window.screenX
    wTop      = window?.screenTop or window.screenY

    options =
      status: 1
      width:  width
      height: height
      top:    (wTop + ($window.height() / 2) - (height / 2)) or 0
      left:   (wLeft + ($window.width() / 2) - (width / 2)) or 0

    opts = _.map(options, (value, key) -> "#{key}=#{value}").join ','
    window.open $target.attr('href'), $target.data('service'), opts
