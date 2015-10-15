Backbone = require 'backbone'
template = -> require('../templates/press.jade') arguments...

module.exports = class PressView extends Backbone.View
  render: ->
    @$el.html template()
    this
