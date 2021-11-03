/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _DaySchedule;
const moment = require('moment');
const Backbone = require('backbone');

export default (_DaySchedule = class DaySchedule extends Backbone.Model {

  day() {
    return this.get('day_of_week');
  }

  formatStart() {
    let output = moment().hour( this.get('start_time') / 60 / 60 ).format('h');
    output += moment().minutes( this.get('start_time') / 60 ).format(':mm');
    output += moment().hour( this.get('start_time') / 60 / 60 ).format('a');
    return output.replace(/:00/g, '');
  }

  formatEnd() {
    let output = moment().hour( this.get('end_time') / 60 / 60 ).format('h');
    output += moment().minutes( this.get('end_time') / 60 ).format(':mm');
    output += moment().hour( this.get('end_time') / 60 / 60 ).format('a');
    return output.replace(/:00/g, '');
  }

  hours() {
    if (this.get('start_time')) {
      return this.formatStart() + ' — ' + this.formatEnd();
    } else {
      return "Closed";
    }
  }
});
