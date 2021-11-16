/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerCities, sd
const Backbone = require("backbone")
const { GEODATA_URL } = (sd = require("sharify").data)

export default _PartnerCities = (function () {
  _PartnerCities = class PartnerCities extends Backbone.Collection {
    static initClass() {
      this.prototype.url = `${GEODATA_URL}/partner-cities/cities.json`
    }
  }
  _PartnerCities.initClass()
  return _PartnerCities
})()
export const PartnerCities = _PartnerCities
