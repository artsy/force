Backbone = require 'backbone'

module.exports = class AddToCalendar extends Backbone.View

  events:
    'click .add-to-calendar-event-item-date__add-to-calender': 'toggleCalenderOptions'

  toggleCalenderOptions: (e) ->
    e.preventDefault()
    $(e.currentTarget).next().toggle()
