ContactView = require './index.coffee'
Feedback = require '../../../models/feedback.coffee'
Representatives = require '../../../collections/representatives.coffee'
template = -> require('../templates/specialist.jade') arguments...

module.exports = class SpecialistView extends ContactView
  template: ->
    template arguments...

  initialize: ->
    @model = new Feedback
    @representatives = new Representatives
    @listenTo @representatives, 'sync', @render
    super

  render: ->
    @$el.html @template
      user: @user
      representative: @representatives.first()
    @autofocus()
    this
