_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
State = require './models/state.coffee'
Form = require './models/form.coffee'
Step1View = require './views/step1.coffee'
Step2View = require './views/step2.coffee'
Step3View = require './views/step3.coffee'
SuccessView = require './views/success.coffee'

module.exports = class PartnerApplicationRouter extends Backbone.Router
  routes:
    'apply': 'step1'
    'apply/': 'step1'
    'apply/:mode': 'step1'
    'apply/:mode/2': 'step2'
    'apply/:mode/3': 'step3'
    'apply/:mode/success': 'success'

  initialize: ->
    @$el = $('#partner-application-page')
    @state = new State
    @form = new Form @bootstrap()
    @listenTo @state, 'change:mode', @updateType

  bootstrap: ->
    data = qs.parse(location.search.replace /^\?/, '')
    Form.validate data

  updateType: (state, type) ->
    @form.set '00NC0000004hoNU', state.value('type')

  execute: ->
    @view?.remove()
    super

  step1: (mode) ->
    @state.set step: 1, mode: mode or 'initial'
    @view = new Step1View state: @state, form: @form
    @$el.html @view.render().$el

  step2: (mode) ->
    @state.set step: 2, mode: mode or 'initial'
    @view = new Step2View state: @state, form: @form
    @$el.html @view.render().$el

  step3: (mode) ->
    @state.set step: 3, mode: mode or 'initial'
    @view = new Step3View state: @state, form: @form
    @$el.html @view.render().$el

  success: (mode) ->
    @state.set mode: mode
    @view = new SuccessView state: @state, form: @form
    @$el.html @view.render().$el
    $(window).off 'beforeunload'
