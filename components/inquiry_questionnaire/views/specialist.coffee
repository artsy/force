StepView = require './step.coffee'
Form = require '../../form/index.coffee'
Feedback = require '../../../models/feedback.coffee'
Representatives = require '../../../collections/representatives.coffee'
template = -> require('../templates/specialist.jade') arguments...

module.exports = class Specialist extends StepView
  template: -> template arguments...

  __events__:
    'click button': 'serialize'

  initialize: ->
    @feedback = new Feedback
    @representatives = new Representatives
    super

  setup: ->
    @representatives.fetch()
      .then => (@representative = @representatives.first()).fetch()
      .then => @render()

  serialize: (e) ->
    form = new Form model: @feedback, $form: @$('form')
    form.submit e, success: =>
      @next()

  render: ->
    @$el.html @template
      user: @user
      representative: @representative
    @autofocus()
    this
