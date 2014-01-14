# GeoFormatter [![Build Status](https://travis-ci.org/afeld/geo_formatter.png?branch=master)](https://travis-ci.org/afeld/geo_formatter)

When interacting with Google Maps via JavaScript, the result objects that are returned are tough to work with.  GeoFormatter is a JS port of the [geocoder Ruby gem's Google result converter](https://github.com/alexreisner/geocoder/blob/master/lib/geocoder/results/google.rb), which wraps a [`GeocoderResult` from Google Maps API v3](https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult) object to provide convenience methods.  Basic usage:

```javascript
// boilerplate geocoding
geocoder.geocode({ 'address': address }, function(results, status){
  if (status === google.maps.GeocoderStatus.OK){

    // wrap a result
    var geo = new GeoFormatter(results[0]);

    // use the convenience methods
    console.log('city:' + geo.getCity() );
    console.log('state:' + geo.getState() );

  }
});
```

Supports AMD, CommonJS, and as a `GeoFormatter` browser global.

## API Docs

### Constructor

Takes a [`google.maps.GeocoderResult`](https://developers.google.com/maps/documentation/javascript/reference#GeocoderResult)

### Methods

* getCoordinates()
* getAddress()
* getNeighborhood()
* getCity()
* getState()
* getStateCode()
* getSubState()
* getSubStateCode()
* getCountry()
* getCountryCode()
* getPostalCode()
* getRoute()
* getStreetNumber()
* getStreetAddress()
* getTypes()
* getFormattedAddress()
* getGeometry()
* getPrecision()

## Running Tests

```bash
npm install
bundle install

npm test
```
