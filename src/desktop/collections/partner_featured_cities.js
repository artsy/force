/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerFeaturedCities, sd
const Backbone = require("backbone")
const { GEODATA_URL } = (sd = require("sharify").data)

export default _PartnerFeaturedCities = (function () {
  _PartnerFeaturedCities = class PartnerFeaturedCities extends Backbone.Collection {
    static initClass() {
      this.prototype.url = `${GEODATA_URL}/partner-cities/featured-cities.json`
    }
  }
  _PartnerFeaturedCities.initClass()
  return _PartnerFeaturedCities
})()
export const PartnerFeaturedCities = _PartnerFeaturedCities
