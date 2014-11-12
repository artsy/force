_ = require 'underscore'
cities = require './cities.coffee'
selected = [
  'new-york'
  'london'
  'los-angeles'
  'paris'
  'berlin'
  'miami'
  'san-francisco'
  'hong-kong'
  'milan'
  'tokyo'
]

module.exports = _.filter cities, ({ slug }) -> _.contains selected, slug
