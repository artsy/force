/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let _Location;
const _ = require('underscore');
const Backbone = require('backbone');
const { LocationRelations } = require('./mixins/relations/location');

export default (_Location = (function() {
  _Location = class Location extends Backbone.Model {
    static initClass() {

      _.extend(this.prototype, LocationRelations);
    }

    cityStateCountry() {
      return _.compact([
        this.get('city' || ''),
        this.get('state' || ''),
        this.get('country' || '')
      ]).join(', ');
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
  };
  _Location.initClass();
  return _Location;
})());
export const Location = _Location
