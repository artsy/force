/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require('backbone');
const moment = require('moment');
const sd = require('sharify').data;

export const Clock = {
  calculateOffsetTimes(options) {
    if (options == null) { options = {}; }
    const model = new Backbone.Model();
    model.url = `${sd.API_URL}/api/v1/system/time`;
    return model.fetch({
      success: response => {
        const offset = moment().diff(response.get('iso8601'));
        this.set('offsetLiveStartAtMoment', moment(this.get('live_start_at')).add(offset));
        this.set('offsetStartAtMoment', moment(this.get('start_at')).add(offset));
        this.set('offsetEndAtMoment', moment(this.get('end_at')).add(offset));
        this.updateState();
        if ((options != null ? options.success : undefined) != null) { return options.success(); }
      },
      error: (options != null ? options.error : undefined)
    });
  },

  updateState() {
    return this.set('clockState', ((() => {

      if (moment().isAfter(this.get('offsetEndAtMoment')) || (this.get('auction_state') === 'closed')) {
        return 'closed';
      } else if (this.get('live_start_at') && moment().isBefore(this.get('offsetLiveStartAtMoment'))) {
        return 'live';
      } else if (this.get('live_start_at') && moment().isAfter(this.get('offsetLiveStartAtMoment'))) {
        return 'live-open';
      } else if (moment().isAfter(this.get('offsetStartAtMoment')) && moment().isBefore(this.get('offsetEndAtMoment'))) {
        return 'open';
      } else if (moment().isBefore(this.get('offsetStartAtMoment'))) {
        return 'preview';
      }

    })()));
  }
};
