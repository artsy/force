/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require('underscore');
const geo = require('../../components/geo/index.coffee');
const { Location } = require('../location');
const GeoFormatter = require('geoformatter');

export const Geo = {
  location() {
    if (this.get('location')) { return new Location(this.get('location')); }
  },

  approximateLocation(options) {
    if (options == null) { options = {}; }
    return geo.locate({
      accuracy: 'low',
      success: _.wrap(options.success, (success, geoFormatted) => {
        if (!this.hasLocation()) {
          this.setGeo(geoFormatted, {silent: true});
        }
        return (typeof success === 'function' ? success() : undefined);
      })
    });
  },

  // Gravity runs a delayed job after user saves that geolocates
  // the last_sign_in_ip. So, for now, this is the most accurate way to
  // ascertain whether or not we have a usable location as this is the string
  // that would be displayed as the value in the location input
  hasLocation() {
    return !_.isEmpty(__guard__(this.location(), x => x.cityStateCountry()));
  },

  setLocation(obj) {
    // Google will return an object with nothing but a name property if it
    // doesn't know what to do with it. Geoformatter will choke on those objects.
    //
    // Google will also return { name: "" } if you submit an empty result
    const keys = _.keys(obj);
    if ((keys.length === 1) && (keys[0] === 'name')) {
      // We just set the name as the "city"
      // this also lets the user remove their location
      return this.set({location: {
        city: obj.name || '',
        state: '',
        state_code: '',
        postal_code: '',
        coordinates: null,
        country: ''
      }
      });
    } else {
      return this.setGeo(new GeoFormatter(obj));
    }
  },

  setGeo(geoFormatted, options) {
    if (options == null) { options = {}; }
    return this.set({location: {
      city: geoFormatted.getCity() || '',
      state: geoFormatted.getState() || '',
      state_code: geoFormatted.getStateCode() || '',
      postal_code: geoFormatted.getPostalCode() || '',
      coordinates: geoFormatted.getCoordinates() || null,
      country: geoFormatted.getCountry() || ''
    }
  }
    , options);
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

export default Geo
