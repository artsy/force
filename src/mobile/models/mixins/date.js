/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const moment = require('moment');

export const Date = {

  formattedDateRange() {
    const momentStart = moment(this.get('start_at'));
    const momentEnd = moment(this.get('end_at'));
    if (momentStart.format('MM') === momentEnd.format('MM')) {
      return `${momentStart.format('MMM. Do')} &ndash; ${momentEnd.format('Do')}`;
    } else {
      return `${momentStart.format('MMM. Do')} &ndash; ${momentEnd.format('MMM. Do')}`;
    }
  },

  fromNow(attr) {
    return moment(this.get(attr)).fromNow();
  },

  groupByDate(attr) {
    return moment(this.get(attr)).format('YYYY-MM-DD');
  }
};
