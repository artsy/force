/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _PartnerLocation;
const _ = require('underscore');
const sd = require('sharify').data;
const querystring = require('querystring');
const { Markdown } = require('@artsy/backbone-mixins');
const { Location } = require('./location');

export default (_PartnerLocation = (function() {
  _PartnerLocation = class PartnerLocation extends Location {
    static initClass() {

      _.extend(this.prototype, Markdown);
    }

    fullAddress() {
      const lines = [
        this.get('address'),
        this.get('address2'),
        `${this.get('city')}, ${this.get('state')} ${this.get('postal_code')}`,
        this.get('country')
      ];
      if (lines.length) { return (Array.from(lines).filter((line) => line)).join(', '); } else { return ''; }
    }

    phoneHref() {
      if (this.has('phone')) {
        return `tel:${this.get('phone').replace(/\D/g, '')}`;
      } else {
        return '';
      }
    }

    cityState() {
      return _.compact([this.get('city'), this.get('state')]).join(', ');
    }

    cityStateCountry() {
      return _.compact([
        this.get('city' || ''),
        this.get('state' || ''),
        this.get('country' || '')
      ]).join(', ');
    }

    center() {
      if (this.has('coordinates')) {
        return `${this.get('coordinates').lat},${this.get('coordinates').lng}`;
      } else {
        return this.fullAddress();
      }
    }

    gmapLink() {
      return `https://maps.google.com/maps?${querystring.stringify({ q: this.center() })}`;
    }

    gmapImageUrl(size) {
      if (size == null) { size = '600x150'; }
      const options = {
        center: this.center(),
        markers: `color:0x873ff0|${this.center()}`,
        maptype: 'roadmap',
        sensor: 'false',
        style: 'lightness:50|saturation:-100',
        zoom: '16',
        key: sd.GOOGLE_MAPS_API_KEY,
        size
      };
      return `http://maps.googleapis.com/maps/api/staticmap?${querystring.stringify(options)}`;
    }
  };
  _PartnerLocation.initClass();
  return _PartnerLocation;
})());
export const PartnerLocation = _PartnerLocation
