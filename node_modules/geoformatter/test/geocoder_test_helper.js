var fs = require('fs'),
  GeoFormatter = require('../geo_formatter');

var fixturePath = process.argv[2],
  data = JSON.parse(fs.readFileSync(fixturePath)).results[0];

var loc = data.geometry.location,
  lat = loc.lat,
  lng = loc.lng;

// big hack to have .lat and .lng be function like in the JS API, vs values in the JSON API
loc.lat = function(){ return lat; };
loc.lng = function(){ return lng; };

var geo = new GeoFormatter(data),
  methodName = process.argv[3],
  result = geo[methodName]();

if (methodName === 'getGeometry'){
  result.location.lat = lat;
  result.location.lng = lng;
}

if (result === undefined){
  result = null;
}

console.log(JSON.stringify(result));
