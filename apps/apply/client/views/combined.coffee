_ = require 'underscore'
Backbone = require 'backbone'
modes = require '../modes.coffee'
Form = require '../../../../components/mixins/form.coffee'
Checkboxes = require './checkboxes.coffee'
subformTemplates =
  initial: -> ''
  institution: -> ''
  fair: -> ''
  general: -> ''
  gallery: -> require('../templates/forms/gallery.jade') arguments...
template = -> require('../templates/combined.jade') arguments...

module.exports = class CombinedView extends Backbone.View
  _.extend @prototype, Form
  _.extend @prototype, Checkboxes

  events:
    'change .paf-type-select': 'selectMode'
    'click button': 'submit'

  initialize: ({ @state, @form }) ->
    @listenTo @state, 'change:mode', @changeMode
    @listenTo @state, 'change:mode', @renderMode

  selectMode: (e) ->
    @state.set 'mode', $(e.currentTarget).val()

  changeMode: ->
    Backbone.history.navigate @state.route(), trigger: false

  renderMode: ->
    @renderLabels()
    # Ensure the select box is in the correct state
    @$('.paf-type-select').val @state.mode().value
    # Render type-specific sub-form
    @$('#paf-subform').html subformTemplates[@state.get 'mode']
      state: @state, form: @form

  renderLabels: ->
    @$('#paf-company-label').text {
      initial: 'Organization Name'
      gallery: 'Gallery Name'
      institution: 'Institution Name'
      fair: 'Fair Name'
      general: 'Organization Name'
    }[@state.get('mode')]

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
    @$el.html template(form: @form, modes: modes)
    _.defer => @renderMode()
    this
