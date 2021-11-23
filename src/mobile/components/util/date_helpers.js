/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _DateHelpers;
const moment = require('moment');

export const DateHelpers = (_DateHelpers = class DateHelpers {

  static formatDate(utc_date) {
    const date = moment.utc(utc_date);

    const month = date.format('MMM');

    const day = date.format('D');

    return `${month} ${day}`;
  }

  static timespanInWords(utc_start, utc_end) {
    const start = moment.utc(utc_start);
    const end = moment.utc(utc_end);

    let startMonth = start.format('MMM');
    // don't append a . for May, 0-based months
    if (start.month() !== 4) { startMonth += "."; }
    const startDay = start.format('Do');

    let endMonth = end.format('MMM');
    // don't append a . for May, 0-based months
    if (end.month() !== 4) { endMonth += "."; }
    const endDay = end.format('Do');

    if (start.year() === end.year()) {
      let monthAndDate;
      if ((start.month() === end.month()) && (start.date() === end.date())) {
        monthAndDate = `${startMonth} ${startDay}`;
      } else if (start.month() === end.month()) {
        monthAndDate = `${startMonth} ${startDay} – ${endDay}`;
      } else {
        monthAndDate = `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
      }

      if (start.year() !== moment(new Date()).year()) {
        return `${monthAndDate} ${start.year()}`;
      } else {
        return monthAndDate;
      }
    } else {
      return `${startMonth} ${startDay}, ${start.format('YYYY')} – ${endMonth} ${endDay}, ${end.format('YYYY')}`;
    }
  }

  static getMonthRange() { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; }

  static getYearRange(range) {
    if (range == null) { range = 10; }
    const startDate = new Date();
    const startYear = startDate.getFullYear();

    const endDate = new Date(`01 Jan ${startYear + range}`);
    const endYear = endDate.getFullYear();

    return __range__(startYear, endYear, true);
  }
});

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}