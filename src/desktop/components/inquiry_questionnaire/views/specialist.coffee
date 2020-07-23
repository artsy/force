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
    @__representatives__ = Promise.resolve @representatives.fetch()
      .then => Promise.resolve (@representative = @representatives.first())?.fetch()
      .finally => @done()

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    @__serialize__ = Promise.all [
      @inquiry.set _.extend { contact_gallery: false }, form.data()
      @user.save @inquiry.pick('name', 'email')
    ]
      .then =>
        @state.set 'inquiry', @inquiry
        @next()
      , (e) ->
        form.error null, e

  done: ->
    @render().$el.removeClass 'is-loading'
