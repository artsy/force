/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerLocations
const _ = require("underscore")
const _s = require("underscore.string")
const Backbone = require("backbone")
const PartnerLocation = require("../models/partner_location")
const { API_URL } = require("sharify").data
const { Fetch } = require("@artsy/backbone-mixins")

export default _PartnerLocations = (function () {
  _PartnerLocations = class PartnerLocations extends Backbone.Collection {
    static initClass() {
      _.extend(this.prototype, Fetch(API_URL))

      this.prototype.model = PartnerLocation
    }

    displayLocations(preferredLocation) {
      if (this.length) {
        let string =
          __guard__(this.findWhere({ city: preferredLocation }), x =>
            x.get("city")
          ) ||
          this.first().get("city") ||
          this.first().get("country")

        if (this.length > 1) {
          string += ` & ${this.length - 1} other location`
          if (this.length !== 2) {
            string += "s"
          }
        }

        return string
      }
    }

    displayCities(separator, unique) {
      if (separator == null) {
        separator = ", "
      }
      if (unique == null) {
        unique = true
      }
      let cities = this.map(loc => _s.titleize(loc.get("city")))
      if (unique) {
        cities = _.uniq(cities)
      }
      return cities.join(separator)
    }
  }
  _PartnerLocations.initClass()
  return _PartnerLocations
})()

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
export const PartnerLocations = _PartnerLocations
