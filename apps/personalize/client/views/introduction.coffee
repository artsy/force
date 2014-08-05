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
    'click .personalize-introduction-edit': 'edit'
    'submit form': 'complete'
    'click button': 'complete'
    'blur input': 'setProfession'

  initialize: ->
    super
    @listenTo @user, 'sync', @syncIntroduction
    @listenTo mediator, 'modal:closed', @syncIntroduction

  edit: (e) ->
    e.preventDefault()
    new IntroductionEditView user: @user, width: '450px'

  setProfession: ->
    @user.save @serializeForm()

  complete: (e) ->
    e.preventDefault()
    return if @formIsSubmitting()
    @$button.attr 'data-state', 'loading'
    @user.save @serializeForm(),
      success: =>
        @advance()
      error: =>
        @$button.attr 'data-state', 'error'
        @reenableForm()

  syncIntroduction: ->
    @introductionView?.update()

  setupIntroduction: ->
    @introductionView = new IntroductionPreviewView el: @$('#personalize-introduction-rendered')

  cacheSelectors: ->
    @$input = @$('input')
    @$button = @$('button')

  postRender: ->
    @cacheSelectors()
    @setupIntroduction()

  render: ->
    @$el.html template(user: @user, state: @state)
    @postRender()
    this

  remove: ->
    @introductionView.remove()
    super
