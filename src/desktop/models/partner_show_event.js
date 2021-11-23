/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerShowEvent;
const _ = require('underscore');
const Backbone = require('backbone');
const { Eventable } = require('./mixins/eventable');

export default (_PartnerShowEvent = (function() {
  _PartnerShowEvent = class PartnerShowEvent extends Backbone.Model {
    static initClass() {
      _.extend(this.prototype, Eventable);
    }

    eventType() {
      if (this.get('event_type') === 'Other') { return 'Event'; } else { return this.get('event_type'); }
    }
  };
  _PartnerShowEvent.initClass();
  return _PartnerShowEvent;
})());
export const PartnerShowEvent = _PartnerShowEvent
