/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let PartnerLocations
const Backbone = require("backbone")
const sd = require("sharify").data
const PartnerLocation = require("../models/partner_location")

module.exports = PartnerLocations = (function () {
  PartnerLocations = class PartnerLocations extends Backbone.Collection {
    static initClass() {
      this.prototype.model = PartnerLocation
    }

    url() {
      return `${sd.API_URL}/api/v1/partner/${this.partnerId}/locations`
    }

    initialize(models, param) {
      if (param == null) {
        param = {}
      }
      const { partnerId } = param
      this.partnerId = partnerId
      //
    }

    getLocationAddressNearest(city) {
      if (!this.length) {
        return
      }

      if (city === "All Galleries") {
        return __guard__(this.first(), x => x.get("city"))
      } else {
        return (
          __guard__(this.findWhere({ city }), x1 => x1.get("address")) ||
          __guard__(this.first(), x2 => x2.get("address"))
        )
      }
    }
  }
  PartnerLocations.initClass()
  return PartnerLocations
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
