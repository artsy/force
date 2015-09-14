_ = require 'underscore'
Backbone = require 'backbone'
State = require '../branching_state/index.coffee'
map = require './map.coffee'
Logger = require './logger.coffee'

module.exports = class InquiryQuestionnaireView extends Backbone.View
  className: 'inquiry-questionnaire'

  initialize: ({ @user, @artwork, @inquiry, @bypass }) ->
    @logger = new Logger
    @state = new State if @bypass
      _.extend {}, map, steps: [@bypass]
    else
      map

    @context =
      user: @user
      inquiry: @inquiry
      artwork: @artwork
      state: @state
      logger: @logger

    @state.inject @context

    @listenTo @state, 'next', @render

  render: ->
    @view?.remove()

    # Give any subviews access to the outer modal
    @context.modal = @modal

    @view = @state.view @context
    @$el.html @view.render().$el

    @logger.log @state.current()

    this
