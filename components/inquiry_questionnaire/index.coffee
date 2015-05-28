_ = require 'underscore'
ModalView = require '../modal/view.coffee'
CurrentUser = require '../../models/current_user.coffee'
LoggedOutUser = require '../../models/logged_out_user.coffee'
State = require '../branching_state/index.coffee'
stateMap = require './map.coffee'

module.exports = class InquiryQuestionnaire extends ModalView
  className: 'inquiry-questionnaire'

  __defaults__: _.extend {}, ModalView::__defaults__,
    dimensions: width: '500px', height: '520px'

  initialize: ->
    @user = CurrentUser.orNull() or new LoggedOutUser
    @state = new State stateMap

    @listenTo @state, 'change:position', @reRender

    super

  template: ->
    @view?.remove()
    @view = @state.view(user: @user, state: @state)
    @view.render().$el
