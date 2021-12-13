/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const LocationRelations = {
  related() {
    if (this.__related__ != null) { return this.__related__; }

    const { DaySchedules } = require('../../../collections/day_schedules');

    const daySchedules = new DaySchedules(this.get('day_schedules'));

    return this.__related__ =
      {daySchedules};
  },

  rebuild() {
    const { daySchedules } = this.related();
    return daySchedules.set(this.get('day_schedules'), {silent: true});
  }
};
