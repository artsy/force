/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _ShowEvents
const Backbone = require("backbone")
const { ShowEvent } = require("../models/show_event")

export default _ShowEvents = (function () {
  _ShowEvents = class ShowEvents extends Backbone.Collection {
    static initClass() {
      this.prototype.model = ShowEvent
    }
  }
  _ShowEvents.initClass()
  return _ShowEvents
})()
export const ShowEvents = _ShowEvents
