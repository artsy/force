_ = require 'underscore'
Backbone = require 'backbone'
State = require '../branching_state/index.coffee'
map = require './map.coffee'
debug = require './debug.coffee'

module.exports = class InquiryQuestionnaireView extends Backbone.View
  className: 'inquiry-questionnaire'

  initialize: ({ @user, @artwork, @inquiry, @bypass }) ->
    @state = new State if @bypass
      _.extend {}, map, steps: [@bypass]
    else
      map

    @context =
      user: @user
      inquiry: @inquiry
      artwork: @artwork
      state: @state

    @state.inject @context

    @listenTo @state, 'next', @render

  render: ->
    debug @state

    @view?.remove()
    @view = @state.view @context
    @$el.html @view.render().$el

    this
