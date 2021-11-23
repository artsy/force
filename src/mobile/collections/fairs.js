/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Fairs
const _ = require("underscore")
const sd = require("sharify").data
const Backbone = require("backbone")
const moment = require("moment")
const { Fair } = require("../models/fair")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _Fairs = (function () {
  _Fairs = class Fairs extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = Fair

      this.prototype.url = `${sd.API_URL}/api/v1/fairs`
    }

    // fairs is the array of links to the previous fairs,
    // since this should only include fairs that have microsites,
    // we filter on has_full_feature.
    // this also allows us to set a fair for the future and
    // have a countdown to the preview
    pastYearRoundFairs() {
      return this.filter(
        model =>
          moment(model.get("end_at")).utc().isBefore(moment().utc()) &&
          model.get("has_full_feature")
      )
    }
  }
  _Fairs.initClass()
  return _Fairs
})()
export const Fairs = _Fairs
