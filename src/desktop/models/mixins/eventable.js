/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const moment = require('moment');

export const Eventable = {
  date(attr) {
    return moment.utc(this.get(attr));
  },

  formatDateRange(start_attr, end_attr, format) {
    if (format == null) { format = 'dddd, MMM Do, h:mma'; }
    const start = this.date(start_attr);
    const end = this.date(end_attr);

    let output = `${start.format(format)} – `;
    output += end.format(start.isSame(end, 'day') ? 'h:mma' : format);

    return output.replace(/:00/g, '');
  }
};
