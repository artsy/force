_ = require 'underscore'
Backbone = require 'backbone'
State = require './models/state.coffee'
Form = require './models/form.coffee'
Step1View = require './views/step1.coffee'
Step2View = require './views/step2.coffee'
Step3View = require './views/step3.coffee'
SuccessView = require './views/success.coffee'
CombinedView = require './views/combined.coffee'
splitTest = require '../../../components/split_test/index.coffee'

module.exports = class PartnerApplicationRouter extends Backbone.Router
  outcomes:
    new: 'step1'
    old: 'combined'

  routes:
    # Direct to 'new'
    'apply/stepped': 'step1'
    'apply/stepped/:mode': 'step1'

    # Direct to 'old'
    'apply/combined': 'combined'
    'apply/combined/:mode': 'combined'

    'apply': 'dispatch'
    'apply/': 'dispatch'
    'apply/:mode': 'dispatch'
    'apply/:mode/2': 'step2'
    'apply/:mode/3': 'step3'
    'apply/:mode/success': 'success'

  initialize: ->
    @$el = $('#partner-application-page')
    @state = new State
    @form = new Form
    @listenTo @state, 'change:mode', @updateType

    @splitTest = splitTest 'partner_application_form'

  updateType: (state, type) ->
    @form.set '00NC0000004hoNU', state.value('type')

  execute: ->
    @view?.remove()
    super

  dispatch: (mode) ->
    @[@outcomes[@splitTest.outcome()]] mode

  combined: (mode) ->
    @splitTest.set 'old'

    @state.set mode: mode or 'initial'
    @view = new CombinedView state: @state, form: @form
    @$el.html @view.render().$el

  step1: (mode) ->
    @splitTest.set 'new'

    @state.set step: 1, mode: mode or 'initial'
    @view = new Step1View state: @state, form: @form
    @$el.html @view.render().$el

  step2: (mode, step) ->
    @state.set step: 2, mode: mode or 'initial'
    @view = new Step2View state: @state, form: @form
    @$el.html @view.render().$el

  step3: (mode, step) ->
    @state.set step: 3, mode: mode or 'initial'
    @view = new Step3View state: @state, form: @form
    @$el.html @view.render().$el

  success: ->
    @view = new SuccessView state: @state, form: @form
    @$el.html @view.render().$el
