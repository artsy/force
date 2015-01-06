_ = require 'underscore'
Backbone = require 'backbone'
modes = require '../modes.coffee'
Form = require '../../../../components/mixins/form.coffee'
Checkboxes = require './checkboxes.coffee'
template = -> require('../templates/step2.jade') arguments...
formTemplates =
  gallery: -> require('../templates/forms/step2/partner.jade') arguments...
  institution: -> require('../templates/forms/step2/institution.jade') arguments...
  fair: -> require('../templates/forms/step2/partner.jade') arguments...
  general: -> require('../templates/forms/step2/partner.jade') arguments...

module.exports = class Step2View extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, Checkboxes

  events:
    'click button': 'submit'
    'click input[type="checkbox"]': 'toggleBoolean'

  initialize: ({ @state, @form }) -> #

  toggleBoolean: (e) ->
    $target = $(e.currentTarget)
    @form.set $target.attr('name'), $target.prop('checked')

  renderMode: ->
    @$('#paf-form').html formTemplates[@state.get('mode')]
      state: @state, form: @form

  submit: (e) ->
    return unless @validateForm()
    e.preventDefault()
    @form.set @serializeForm()
    @next()

  next: ->
    Backbone.history.navigate "#{@state.route()}/3", trigger: true

  render: ->
    @$el.html template(state: @state, form: @form)
    _.defer => @renderMode()
    this
