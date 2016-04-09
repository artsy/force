Backbone = require 'backbone'
template = -> require('./templates/image_set.jade') arguments...
{ resize } = require '../resizer/index.coffee'

module.exports = class ImageSetView extends Backbone.View

  initialize: (options) ->
    { @collection } = options
    @currentIndex = 0

  render: ->
    @$el.html template(collection: @collection, resize: resize)
    this
