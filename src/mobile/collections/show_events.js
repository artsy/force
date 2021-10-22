/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let ShowEvents
const Backbone = require("backbone")
const ShowEvent = require("../models/show_event")

module.exports = ShowEvents = (function () {
  ShowEvents = class ShowEvents extends Backbone.Collection {
    static initClass() {
      this.prototype.model = ShowEvent
    }
  }
  ShowEvents.initClass()
  return ShowEvents
})()
