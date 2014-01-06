// UMD from https://github.com/umdjs/umd/blob/master/returnExports.js
(function(root, factory){
  if (typeof define === 'function' && define.amd){
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object'){
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.GeoFormatter = factory();
  }

}(this, function(){

  var geoFormatter = function(result){
    this.result = result;
  };


  // note we lose the constructor() assigning the prototype this way
  // http://stackoverflow.com/a/12260750/358804
  geoFormatter.prototype = {

    getCoordinates: function(){
      var loc = this.result.geometry.location;
      return [loc.lat(), loc.lng()];
    },

    getAddress: function(){
      return this.result.formatted_address;
    },

    getNeighborhood: function(){
      return this.matchingTypes(['neighborhood']);
    },

    getCity: function(){
      return this.matchingTypes([
        'locality',
        'sublocality',
        'administrative_area_level_3',
        'administrative_area_level_2'
      ], true);
    },

    getState: function(){
      return this.matchingTypes(['administrative_area_level_1']);
    },

    getStateCode: function(){
      return this.matchingTypes(['administrative_area_level_1'], true);
    },

    getSubState: function(){
      return this.matchingTypes(['administrative_area_level_2']);
    },

    getSubStateCode: function(){
      return this.matchingTypes(['administrative_area_level_2'], true);
    },

    getCountry: function(){
      return this.matchingTypes(['country']);
    },

    getCountryCode: function(){
      return this.matchingTypes(['country'], true);
    },

    getPostalCode: function(){
      return this.matchingTypes(['postal_code']);
    },

    getRoute: function(){
      return this.matchingTypes(['route']);
    },

    getStreetNumber: function(){
      return this.matchingTypes(['street_number']);
    },

    getStreetAddress: function(){
      var streetNum = this.getStreetNumber(),
        route = this.getRoute();

      if (streetNum && route){
        return [streetNum, route].join(' ');
      } else {
        return streetNum || route || '';
      }
    },

    getTypes: function(){
      return this.result.types;
    },

    getFormattedAddress: function(){
      return this.result.formatted_address;
    },

    getGeometry: function(){
      return this.result.geometry;
    },

    getPrecision: function(){
      var geom = this.getGeometry();
      return geom ? geom.location_type : null;
    },


    matchingTypes: function(types, shortName){
      var components = this.result.address_components,
        type, component, i, j;

      for (i = 0; i < types.length; i++){
        type = types[i];
        for (j = 0; j < components.length; j++){
          component = components[j];
          if (component.types.indexOf(type) > -1){
            return shortName ? component.short_name : component.long_name;
          }
        }
      }
    }
  };


  return geoFormatter;
}));
