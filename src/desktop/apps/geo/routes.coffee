_ = require 'underscore'
geolib = require 'geolib'
request = require 'superagent'
{ Cities } = require 'places'
{ NODE_ENV, GEOIP_ENDPOINT } = require '../../config'

geoIP = (ip) ->
  new Promise (resolve, reject) ->
    endpoint = GEOIP_ENDPOINT
    endpoint += if NODE_ENV is 'development' then '72.89.161.100' else ip
    request
      .get endpoint
      .end (err, response) ->
        return reject err if err?
        resolve response.body

@ip = (req, res, next) ->
  geoIP req.ip
    .then res.send.bind(res)
    .catch next

@nearest = (req, res, next) ->
  cities = Cities.map (city) ->
    city.latitude = city.coords[0]
    city.longitude = city.coords[1]
    city

  geoIP req.ip
    .then (you) ->
      geolib.findNearest you, cities
    .then (nearest) ->
      yourCity = _.findWhere cities, _.pick(nearest, 'latitude', 'longitude')
      res.send _.extend nearest, yourCity
    .catch next
