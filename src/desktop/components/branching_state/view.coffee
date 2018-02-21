Backbone = require 'backbone'
{ NODE_ENV } = require('sharify').data

module.exports = class StateView extends Backbone.View
  initialize: ({ @state, @views }) ->
    @listenTo @state, 'next', @render

  instantiate: ->
    View = @views[@state.current()]
    new View @state.context if View?

  render: ->
    @view?.remove()
    @view = @instantiate()

    if @view?
      @$el.show().html @view.render().$el
    else
      @$el.hide()

    this
