/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _FairEvent;
const sd = require('sharify').data;
const _ = require('underscore');
const Backbone = require('backbone');
const moment = require('moment');
const { CalendarUrls, Markdown } = require('@artsy/backbone-mixins');

export default (_FairEvent = (function() {
  _FairEvent = class FairEvent extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, CalendarUrls({address: 'venue_address', title: 'name'}));
      _.extend(this.prototype, Markdown);
    }

    urlRoot() { return `${sd.API_URL}/api/v1/fair/${this.fairId}/fair_event`; }

    initialize(attributes, options) {
      return ({ fairId: this.fairId } = options);
    }

    formatDate() {
      const start = moment.utc(this.get('start_at'));
      return `${start.format('dddd')}, ${start.format('MMMM')} ${start.format('D')}`;
    }

    formatTime() {
      const start = moment.utc(this.get('start_at'));
      const end = moment.utc(this.get('end_at'));
      return `${start.format('h')}:${start.format('mm')}-${end.format('h')}:${end.format('mm')}${end.format('A')}`;
    }
  };
  _FairEvent.initClass();
  return _FairEvent;
})());
export const FairEvent = _FairEvent
