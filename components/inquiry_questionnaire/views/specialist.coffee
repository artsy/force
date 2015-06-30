SpecialistView = require '../../simple_contact/views/specialist.coffee'
StepView = require './step.coffee'

module.exports = class Specialist extends SpecialistView
  initialize: (options = {}) ->
    super

    { @state } = options

    @representatives.fetch()
      .then => @representatives.first().fetch()
      .then => @render()

    @listenTo @model, 'sync', -> @state.next()

  autofocus: StepView::autofocus

  render: ->
    super
    @autofocus()
    this
