_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
{ API_URL } = require('sharify').data
IntroductionEditView = require './introduction_edit.coffee'
mediator = require '../../../../lib/mediator.coffee'
Form = require '../../../../components/mixins/form.coffee'
IntroductionPreviewView = require '../../../../components/introduction/index.coffee'
template = -> require('../../templates/introduction.jade') arguments...

module.exports = class IntroductionView extends StepView
  _.extend @prototype, Form

  events:
    'click .personalize-skip': 'advance'
    'click .personalize-introduction-edit': 'edit'

  initialize: ->
    super
    @listenTo @user, 'sync', @syncIntroduction
    @listenTo mediator, 'modal:closed', @syncIntroduction

  edit: (e) ->
    e.preventDefault()
    new IntroductionEditView user: @user, width: '450px'

  syncIntroduction: ->
    @introductionView?.update()

  postRender: ->
    @introductionView = new IntroductionPreviewView el: @$('#personalize-introduction-rendered')

  render: ->
    @$el.html template(user: @user, state: @state)
    @postRender()
    this

  remove: ->
    @introductionView.remove()
    super
