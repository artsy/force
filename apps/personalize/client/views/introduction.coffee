_ = require 'underscore'
Backbone = require 'backbone'
StepView = require './step.coffee'
{ API_URL } = require('sharify').data
IntroductionEditView = require './introduction_edit.coffee'
mediator = require '../../../../lib/mediator.coffee'
Form = require '../../../../components/mixins/form.coffee'
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

    @introduction = new Backbone.Model
    @introduction.url = "#{API_URL}/api/v1/me/inquiry_introduction"

    @listenTo @introduction, 'sync', @renderIntroduction
    @listenTo @user, 'sync', @syncIntroduction
    @listenTo mediator, 'modal:closed', @syncIntroduction

  edit: (e) ->
    e.preventDefault()
    new IntroductionEditView user: @user

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
    return if @syncing
    @syncing = true
    @$introduction.attr 'data-state', 'loading'
    @introduction.save null,
      success: => @syncing = false
      error: => @syncing = false

  renderIntroduction: ->
    @$introduction.attr 'data-state', 'loaded'
    @$paragraph.text @introduction.get('introduction')

  cacheSelectors: ->
    @$introduction = @$('#personalize-introduction-preview')
    @$paragraph = @$('#personalize-introduction-rendered')
    @$input = @$('input')
    @$button = @$('button')

  postRender: ->
    @cacheSelectors()
    @syncIntroduction()

  render: ->
    @$el.html template(user: @user, state: @state)
    @postRender()
    this
