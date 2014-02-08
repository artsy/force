Backbone          = require 'backbone'
sd                = require('sharify').data
infoTemplate      = -> require('../templates/info.jade') arguments...

module.exports = class FairInfo extends Backbone.View

  mapWidth: 300
  mapHeight: 165

  initialize: (options) ->
    @fair = options.fair
    @render()

  render: ->
    @$el.html infoTemplate(fair: @fair)

    if @fair.get('location')
      @displayMap()
    @targetBlankLinks()

  displayMap: ->
    src = @fair.location().mapImageSrc(@mapWidth, @mapHeight)
    @$('img.map').attr('src': src) if src

  targetBlankLinks: ->
    @$('a').attr target: "_blank"
