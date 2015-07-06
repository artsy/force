Backbone = require 'backbone'
template = -> require('./templates/index.jade') arguments...

module.exports = class ImagesView extends Backbone.View
  className: 'artwork-images'

  events:
    'click .js-artwork-additional-image': 'change'

  change: (e) ->
    e.preventDefault()
    @collection.setActive $(e.currentTarget).data 'id'
    @render()

  render: ->
    @$el.html template
      artwork: @model
      image: @collection.active()
      images: @collection
    this
