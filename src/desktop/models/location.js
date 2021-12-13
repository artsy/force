/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Location;
const _ = require('underscore');
const Backbone = require('backbone');
const { compactObject } = require('./mixins/compact_object');

export default (_Location = class Location extends Backbone.Model {
  defaults() {
    return {
      raw: '',
      address: '',
      address_2: '',
      city: '',
      state: '',
      state_code: '',
      postal_code: '',
      country: '',
      coordinates: null,
      summary: ''
    };
  }

  lines() {
    return _.compact([
      this.get('address' || ''),
      this.get('address_2' || ''),
      this.cityStatePostalCode() || '',
      this.get('country' || '')
    ]);
  }

  cityState() {
    return _.compact([
      this.get('city' || ''),
      this.get('state' || '')
    ]).join(', ');
  }

  cityStateCountry() {
    return _.compact([
      this.get('city' || ''),
      this.get('state' || ''),
      this.get('country' || '')
    ]).join(', ');
  }

  cityStatePostalCode() {
    return _.compact([
      this.cityState() || '',
      this.get('postal_code') || ''
    ]).join(' ');
  }

  cityPhone() {
    return _.compact([
      this.get('city'),
      this.get('phone')
    ]).join(': ');
  }

  singleLine() {
    return _.compact([
      this.get('city' || ''),
      _.compact([
        this.get('address' || ''),
        this.get('address_2' || '')
      ]).join(' ')
    ]).join(', ');
  }

  singleWord() {
    return this.get('city' ||
    this.get('country')
    );
  }

  toHtml() {
    let telephone;
    if (this.get('phone')) { telephone = `Tel: ${this.get('phone')}`; }
    return _.compact(_.flatten([this.lines(), telephone])).join('<br/>');
  }

  displayAddress() {
    if (this.lines()) { return this.lines().join(", "); } else { return ""; }
  }

  displayName() {
    if (this.has("display")) { return this.get("display"); } else { return this.get("name"); }
  }

  getMapsLocation() {
    if (this.get('coordinates')) {
      return `${this.get('coordinates').lat},${this.get('coordinates').lng}`;
    } else {
      return this.displayAddress();
    }
  }

  toString() {
    return this.cityStateCountry();
  }

  toJSONLD() {
    const address = [this.get('address') || '', this.get('address_2') || ''].join('');
    return compactObject({
      "@type": "Place",
      name: this.get('name'),
      address: compactObject({
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: this.get('city'),
        addressRegion: this.get('state'),
        postalCode: this.get('postal_code'),
        addressCountry: __guard__(this.get('country'), x => x.length) > 0 ? this.get('country') : undefined
      })
    });
  }
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
export const Location = _Location
