Backbone = require 'backbone'

module.exports = class AddToCalendar extends Backbone.View

  events:
    'mouseover .add-to-calendar-event-item-date__add-to-calender': 'showCalenderOptions'
    'mouseleave .add-to-calendar__wrapper': 'hideCalenderOptions'

  showCalenderOptions: (e) ->
    e.preventDefault()
    @$el.find('.add-to-calendar__wrapper').css({height: '205px'})
    $(e.currentTarget).next().show()

  hideCalenderOptions: (e) ->
    e.preventDefault()
    @$el.find('.add-to-calendar__wrapper').css({height: ''})
    $(e.currentTarget).children('.add-to-calendar-event-calendar-wrapper').hide()
