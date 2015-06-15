SpecialistView = require '../../simple_contact/views/specialist.coffee'

module.exports = class Specialist extends SpecialistView
  initialize: ({ @state }) ->
    super

    @representatives.fetch()
      .then => @representatives.first().fetch()
      .then => @render()

    @listenTo @model, 'sync', -> @state.next()
