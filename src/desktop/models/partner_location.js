/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerLocation;
const _ = require('underscore');
const { Location } = require('./location');
const { getMapImageSrc, getMapLink, getDirections } = require("../components/util/google_maps.coffee");
const { Markdown } = require('@artsy/backbone-mixins');

export default (_PartnerLocation = (function() {
  _PartnerLocation = class PartnerLocation extends Location {
    static initClass() {

      _.extend(this.prototype, Markdown);
    }

    googleMapsLink() {
      const location = this.getMapsLocation();
      if (!location) { return; }
      const options =
        {q: location};
      if (!this.has('coordinates')) {
        options.hnear = location;
      }
      return getMapLink(options);
    }

    mapImageSrc(width, height, scale, zoom) {
      if (scale == null) { scale = 1; }
      if (zoom == null) { zoom = 16; }
      const location = this.getMapsLocation();
      if (!location) { return; }

      return getMapImageSrc({
        size: `${width}x${height}`,
        center: location,
        markers: `color:0x873ff0|${location}`,
        scale,
        zoom
      });
    }

    mapDirections(origin) {
      const location = this.getMapsLocation();
      if (!location) { return; }

      const options = {
        origin,
        destination: location
      };

      return getDirections(options);
    }
  };
  _PartnerLocation.initClass();
  return _PartnerLocation;
})());
export const PartnerLocation = _PartnerLocation
