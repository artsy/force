var _ = require('underscore');
var Cities = require('./cities.js');

var selected = [
  'new-york',
  'london',
  'los-angeles',
  'paris',
  'berlin',
  'miami',
  'san-francisco',
  'hong-kong',
  'milano',
  'sao-paolo',
  'tokyo'
];

module.exports =
  _.chain(Cities).
    filter(function( city ){
      return _.contains(selected, city.slug);
    }).
    sortBy(function(city){
      return city.sort_order;
    }).value();
