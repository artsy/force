/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _DaySchedules
const _ = require("underscore")
const moment = require("moment")
const Backbone = require("backbone")
const { DaySchedule } = require("../models/day_schedule")

export default _DaySchedules = (function () {
  _DaySchedules = class DaySchedules extends Backbone.Collection {
    static initClass() {
      this.prototype.model = DaySchedule

      this.prototype.days_of_the_week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]
    }

    hoursToday() {
      return this.hoursForDay(moment().format("dddd"))
    }

    hoursForDay(day) {
      // Get all DaySchedule models that occur on the argument 'day'
      const today = _.filter(this.models, function (daySchedule) {
        if (daySchedule.get("day_of_week") === day) {
          return daySchedule
        }
      })
      // If today has models, sort them by starting time and return the concatenated hours, i.e:
      // '10:30am - 6pm, 7pm - 8pm'
      // If there are no DaySchedule models on 'day', return 'Closed'
      if (today.length) {
        return _.chain(today)
          .sortBy(daySchedule => daySchedule.get("start_time"))
          .map(daySchedule => daySchedule.hours())
          .value()
          .join(", ")
      } else {
        return "Closed"
      }
    }

    formattedDays() {
      // Returns generic javascript objects that describe a days hours according to the format:
      // "Monday — Wednesday", "8am — 2pm, 3pm — 8pm"
      // Objects will look like { day_start: 'Monday', day_end: 'Wednesday', hours: "8am — 2pm, 3pm — 8pm" }
      const daySchedules = _.map(this.days_of_the_week, day => {
        return { day_start: day, hours: this.hoursForDay(day) }
      })
      const formattedDaySchedules = [daySchedules[0]]
      _.each(_.rest(daySchedules), function (daySchedule) {
        if (
          formattedDaySchedules[formattedDaySchedules.length - 1]["hours"] ===
          daySchedule["hours"]
        ) {
          return (formattedDaySchedules[formattedDaySchedules.length - 1][
            "day_end"
          ] = daySchedule["day_start"])
        } else {
          return formattedDaySchedules.push(daySchedule)
        }
      })
      return formattedDaySchedules
    }
  }
  _DaySchedules.initClass()
  return _DaySchedules
})()
export const DaySchedules = _DaySchedules
