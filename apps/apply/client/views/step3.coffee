_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../../../../components/mixins/form.coffee'
Checkboxes = require './checkboxes.coffee'
template = -> require('../templates/step3.jade') arguments...

module.exports = class Step3View extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, Checkboxes

  events:
    'click button': 'submit'
    'click input[type="checkbox"]': 'toggleBoolean'

  initialize: ({ @state, @form }) -> #

  toggleBoolean: (e) ->
    $target = $(e.currentTarget)
    @form.set $target.attr('name'), $target.prop('checked')

  submit: (e) ->
    return unless @validateForm()
    e.preventDefault()
    @$('button').attr 'data-state', 'loading'
    @form.save @serializeForm(), success: @finish, error: @error

  finish: =>
    Backbone.history.navigate "#{@state.route()}/success", trigger: true
    @state.set 'state', 'success'

  error: =>
    @$('button').attr 'data-state', 'error'
    @state.set 'state', 'error'

  render: ->
    @$el.html template(state: @state, form: @form)
    this
