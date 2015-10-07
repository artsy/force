Backbone = require 'backbone'

module.exports = class StateView extends Backbone.View
  initialize: ({ @state }) ->
    @listenTo @state, 'next', @render

  render: ->
    @view?.remove()
    @view = @state.view()
    @$el.html @view.render().$el
    this
