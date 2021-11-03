/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerShowEvents
const { PartnerShowEvent } = require("../models/partner_show_event")
const Backbone = require("backbone")

export default _PartnerShowEvents = (function () {
  _PartnerShowEvents = class PartnerShowEvents extends Backbone.Collection {
    static initClass() {
      this.prototype.model = PartnerShowEvent
    }
  }
  _PartnerShowEvents.initClass()
  return _PartnerShowEvents
})()
export const PartnerShowEvents = _PartnerShowEvents
