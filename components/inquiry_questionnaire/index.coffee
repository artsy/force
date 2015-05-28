_ = require 'underscore'
Backbone = require 'backbone'
ModalView = require '../modal/view.coffee'
CurrentUser = require '../../models/current_user.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
State = require '../branching_state/index.coffee'
stateMap = require './map.coffee'

module.exports = class InquiryQuestionnaire extends ModalView
  className: 'inquiry-questionnaire'

  __defaults__: _.extend {}, ModalView::__defaults__,
    dimensions: width: '500px', height: '580px'

  initialize: ({ @artwork }) ->
    @user = CurrentUser.orNull() or new LoggedOutUser
    @state = new State _.extend stateMap,
      steps: stateMap.steps[0].prequalify.true

    @state.inject user: @user, state: @state

    @listenTo @state, 'change:position', @reRender

    super

  template: ->
    @view?.remove()
    @view = @state.view user: @user, state: @state, artwork: @artwork
    @view.render().$el
