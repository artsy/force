_ = require 'underscore'

module.exports =
  displayLocations: (locations, preferredCity) ->
    if locations.length
      string =
        _.findWhere(locations, city: preferredCity)?.city or
        locations[0].city or
        locations[0].country

      if locations.length > 1
        string += " & #{locations.length - 1} other location"
        string += "s" unless locations.length is 2

      string
