Backbone = require 'backbone'
template = -> require('../templates/press.pug') arguments...

module.exports = class PressView extends Backbone.View
  render: ->
    @$el.html template()
    this
