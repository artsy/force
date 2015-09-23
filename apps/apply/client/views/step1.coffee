_ = require 'underscore'
Backbone = require 'backbone'
{ Countries } = require 'places'
Form = require '../../../../components/mixins/form.coffee'
template = -> require('../templates/step1.jade') arguments...
usTemplate = -> require('../templates/forms/step1/us.jade') arguments...
themTemplate = -> require('../templates/forms/step1/them.jade') arguments...
formTemplates =
  initial: -> ''
  gallery: -> require('../templates/forms/step1/partner.jade') arguments...
  institution: -> require('../templates/forms/step1/institution.jade') arguments...
  fair: -> require('../templates/forms/step1/partner.jade') arguments...
  auction: -> require('../templates/forms/step1/partner.jade') arguments...
  general: -> require('../templates/forms/step1/partner.jade') arguments...

module.exports = class Step1View extends Backbone.View
  _.extend @prototype, Form

  events:
    'change .paf-type-select': 'selectMode'
    'change .paf-country-select': 'selectCountry'
    'click button': 'submit'

  initialize: ({ @state, @form }) ->
    @listenTo @state, 'change:mode', @changeMode
    @listenTo @state, 'change:mode', @renderMode

    @preventNavigation = _.once ->
      $(window).bind 'beforeunload', ->
        'Your application has not been submitted yet.'

  selectMode: (e) ->
    @state.set 'mode', $(e.currentTarget).val()

  selectCountry: (e) ->
    @$('#paf-country-select').html(
      if $(e.currentTarget).val() is 'United States' then usTemplate(form: @form) else themTemplate(form: @form)
    )

  changeMode: ->
    Backbone.history.navigate @state.route(), trigger: false

  renderMode: ->
    # Ensure the select box is in the correct state
    @$('.paf-type-select').val @state.get('mode')
    # Render type-specific sub-form
    @$('#paf-form').html formTemplates[@state.get('mode')]
      state: @state, form: @form, countries: Countries

  submit: (e) ->
    @preventNavigation()
    return unless @validateForm()
    e.preventDefault()
    @form.set @serializeForm()
    @next()

  next: ->
    Backbone.history.navigate "#{@state.route()}/2", trigger: true

  render: ->
    @$el.html template(state: @state, form: @form)
    _.defer => @renderMode()
    this
