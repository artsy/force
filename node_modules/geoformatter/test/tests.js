var assert = require('assert'),
  fs = require('fs'),
  GeoFormatter = require('../geo_formatter');

var rawData = JSON.parse(fs.readFileSync('test/data.json'));
// Google uses arbitrary attribute names on the LatLng, so these methods need to be used
// http://stackoverflow.com/a/15315483/358804
rawData.forEach(function(result){
  var loc = result.geometry.location;
  loc.lat = function(){ return loc.jb; };
  loc.lng = function(){ return loc.kb; };
});

var TEST_DATA = [
  {
    raw: rawData[0],
    expected: {
      getCoordinates: [30.0444196, 31.23571160000006],
      getAddress: 'Cairo, Cairo Governorate, Egypt',
      getCity: 'Cairo',
      getState: 'Cairo Governorate',
      getStateCode: 'Cairo Governorate',
      getCountry: 'Egypt'
    }
  }
];

describe('GeoFormatter', function(){
  TEST_DATA.forEach(function(testItem){
    var name = testItem.raw.formatted_address;
    describe('for "' + name + '"', function(){
      var loc = new GeoFormatter(testItem.raw);
      Object.keys(testItem.expected).forEach(function(method){
        it('#' + method + '()', function(){
          assert.deepEqual(loc[method](), testItem.expected[method]);
        });
      });
    });
  });
});
