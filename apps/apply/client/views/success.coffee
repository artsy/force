Backbone = require 'backbone'
template = -> require('../templates/success.jade') arguments...

module.exports = class SuccessView extends Backbone.View
  initialize: ({ @state, @form }) -> #

  render: ->
    @$el.html template(state: @state, form: @form)
    this
