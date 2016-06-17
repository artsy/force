{ View } = require 'backbone'
{ VIDEO } = require('sharify').data

module.exports = class ArtworkVideoView extends View
  className: 'artwork-video'

  render: ->
    @$el.html VIDEO.embed
    this
