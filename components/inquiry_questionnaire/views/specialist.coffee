_ = require 'underscore'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
Representatives = require '../../../collections/representatives.coffee'
template = -> require('../templates/specialist.jade') arguments...

module.exports = class Specialist extends StepView
  className: 'iq-loadable is-loading'

  template: (data) ->
    template _.extend data,
      message: @inquiry.get('message')
      representative: @representative

  __events__:
    'click button': 'serialize'

  initialize: ->
    @representatives = new Representatives
    super

  setup: ->
    @representatives.fetch()
      .then => (@representative = @representatives.first()).fetch()
      .then =>
        @render().$el.removeClass 'is-loading'

  serialize: (e) ->
    form = new Form model: @inquiry, $form: @$('form')
    return unless form.start()
    e.preventDefault()

    @inquiry.set _.extend { contact_gallery: false }, form.data()
    @user.set @inquiry.pick('name', 'email')

    @next()
