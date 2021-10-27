module.exports   =
  related: ->
    return @__related__ if @__related__?

    DaySchedules = require '../../../collections/day_schedules'

    daySchedules = new DaySchedules @get('day_schedules')

    @__related__ =
      daySchedules: daySchedules

  rebuild: ->
    { daySchedules } = @related()
    daySchedules.set @get('day_schedules'), silent: true
