/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Fairs
const _ = require("underscore")
const sd = require("sharify").data
const moment = require("moment")
const Backbone = require("backbone")
const FairEvent = require("../models/fair_event")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _Fairs = (function () {
  _Fairs = class Fairs extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = FairEvent
    }

    url() {
      return `${sd.API_URL}/api/v1/fair/${this.fairId}/fair_events`
    }

    initialize(models, options) {
      return ({ fairId: this.fairId } = options)
    }

    sortedEvents() {
      return this.chain()
        .sortBy(event => event.get("start_at"))
        .groupBy(event =>
          moment(Date.parse(event.get("start_at"))).format("dddd")
        )
        .value()
    }
  }
  _Fairs.initClass()
  return _Fairs
})()
export const Fairs = _Fairs
