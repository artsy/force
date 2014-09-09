_ = require 'underscore'
Cookies = require 'cookies-js'
{ splitTest, setProperty, unsetProperty } = require '../../../lib/analytics.coffee'

splitTestKey = 'header-search'
variations =
  autocomplete: 1/2
  search: 1/2

setInterface = (variation) ->
  return unless _.contains _.keys(variations), variation
  Cookies.set splitTestKey, variation
  setProperty _.tap({}, (hsh) -> hsh[splitTestKey] = variation)
  variation

module.exports = ->
  window.currentInterface = currentInterface =
    Cookies.get(splitTestKey) or
    splitTest(splitTestKey, variations) or
    'autocomplete'
  setInterface currentInterface
